# Flower Preservation Wizard — Design

## Summary

Replace the current lead-gen contact form at `/send-your-flowers` with a
multi-step wizard: customer details → keepsake type + price selection →
flower-drying consent → review → branded PDF invoice → share to socials.
The site is a static Create React App frontend with no backend anywhere
(no `/api` routes, no Netlify/Vercel/Firebase functions exist in this
repo), so the whole flow runs client-side.

## Goals

- Let a customer pick a preservation keepsake and see its price up front.
- Capture explicit consent about what happens to unused flowers, per
  Dazzling Luxe's actual policy text.
- Produce a professional, branded PDF invoice the customer downloads and
  sends to the business via social DM (there is no payment processor or
  email/order backend in scope).
- Deter casual invoice tampering without requiring new infrastructure.

## Non-goals

- Real payment processing.
- Server-side invoice storage, lookup, or cryptographic signing (would
  require a backend; explicitly deferred — see Security below).
- Automated posting to Instagram/Facebook/TikTok (no API integration;
  buttons link out or use the OS share sheet).
- Pixel-perfect PDF font match to the site's web fonts (Cormorant
  Garamond/Lato); jsPDF ships only Helvetica/Times/Courier natively.

## Flow

```
DetailsStep -> KeepsakeStep -> ConsentModal -> ReviewStep -> InvoiceStep
```

1. **DetailsStep** — name (required), email or phone (at least one
   required), flower type/description, optional story message. Replaces
   the fields on the current form; drops the old `occasion` /
   `keepsakeType` selects since keepsake choice now has its own priced
   step.
2. **KeepsakeStep** — single-select price cards:
   - Coaster — $80
   - Suncatcher — $80
   - Plaque — $80
   - Display Piece — $180
   - Shadow Box — $70
3. **ConsentModal** — shown after a keepsake is chosen, must be answered
   to proceed. Displays the exact policy text:

   > Because flower preservation requires additional flowers for
   > testing, breakage, colour changes and design selection, Dazzling
   > Luxe may retain and reuse excess prepared flowers that are not
   > incorporated into the customer's commissioned piece. If you would
   > like all unused flowers returned, please request this before the
   > preservation process begins; additional preparation/handling fees
   > may apply.

   Two mutually exclusive choices:
   - "Dazzling Luxe may keep unused flowers" — no charge.
   - "Return my unused flowers" — adds `RETURN_FEE_PLACEHOLDER` to the
     invoice. This constant ships with an obvious placeholder value and
     a comment pointing at where to change it; the business owner will
     set the real number later.
4. **ReviewStep** — line-item breakdown (keepsake price, return fee if
   applicable, total) with an edit-previous-step affordance and a
   "Generate Invoice" action.
5. **InvoiceStep** — renders the generated PDF's summary on-screen,
   offers Download, and a Share section (see Sharing below).

`SendYourFlowersPage.tsx` becomes a thin state machine over these five
steps (`useState<Step>`), holding the accumulated form/selection state
and passing step-specific props down. No routing changes — same URL,
same nav entry points (Header, Footer, MobileBottomNav, HeroSection
already link to `/send-your-flowers`).

## File layout

Following the existing convention of domain sub-folders under
`src/components/` (`home/`, `layout/`, `seasonal/`, `shared/`):

```
src/components/flowerPreservation/
  SendYourFlowersWizard.tsx   (step machine, replaces page body)
  DetailsStep.tsx
  KeepsakeStep.tsx
  ConsentModal.tsx
  ReviewStep.tsx
  InvoiceStep.tsx
  config.ts                  (prices, RETURN_FEE_PLACEHOLDER, CONSENT_TEXT, SOCIAL_LINKS placeholders)
  types.ts                   (WizardState, KeepsakeOption, ConsentChoice)
src/utils/invoiceGenerator.ts (pure calculations + verification code + jsPDF document builder)
src/pages/SendYourFlowersPage.tsx (thin wrapper rendering the wizard)
```

## Invoice PDF

Built with `jsPDF` (new dependency, no backend). Layout:

- **Header**: `logo-dazz-transparent.png` (already in `public/`), business
  name in Times bold (serif, closest native match to the site's heading
  font), a warmGold (`#C8A96E`) rule beneath it, cream (`#FFF8F0`)
  background band.
- **Body**: charcoal (`#2C2C2C`) text on white, softBrown (`#6B5B4F`) for
  labels, a bordered line-item table (keepsake type, price, return fee
  if chosen, bold total with a gold underline), and the consent clause
  text in a boxed callout so the customer's agreement is visible on the
  document itself.
- **Footer**: invoice number, date, and the verification code in small
  monospace-style text, plus a short thank-you line in a gold border.

Colors and the logo asset are pulled from the existing Tailwind config
and `public/` folder — no new brand assets needed.

## Verification code (anti-tamper deterrent)

Computed client-side via the browser's built-in `crypto.subtle.digest`
(SHA-256, no extra dependency), truncated to 8 hex chars, derived from
the invoice number + customer email + total + keepsake type. Printed on
the PDF. If someone edits the visible numbers in a PDF viewer, the
printed code no longer matches those numbers, so a quick recompute
(manually, by the business) reveals tampering.

**Explicit limitation**: this is a deterrent, not proof. Anyone with
access to the site's JS bundle can see the hashing logic and recompute a
matching code for edited numbers. True tamper-proof verification would
require a backend to independently generate/store/verify invoices, which
is out of scope for this static site (confirmed with the business owner
— acceptable tradeoff for now).

## Sharing

After download, an InvoiceStep "Share" button calls `navigator.share()`
with the generated PDF file where supported (most mobile browsers),
letting the customer pick Instagram/Facebook/TikTok/Messages/etc.
directly from their OS share sheet. Where unsupported (most desktop
browsers, or if the call throws/is cancelled), falls back silently to
three static profile-link buttons (Instagram/Facebook/TikTok) using
placeholder URLs in `config.ts`, with a note asking the customer to DM
the downloaded PDF manually. Real handles will be filled in later by the
business owner.

## Error handling

- Step progression is gated by validation (name + email-or-phone before
  leaving DetailsStep; a keepsake selection before the consent modal can
  open; a consent choice before ReviewStep).
- PDF generation failures are caught and shown inline with a retry
  action; wizard state (selections, details) is preserved so the
  customer doesn't have to start over.
- `navigator.share()` rejection/cancellation is caught and treated as a
  no-op — falls back to the static link buttons, never surfaces an
  error to the user for what is normal share-sheet dismissal.

## Testing

- Unit tests for the pure pricing/total calculation and the
  verification-code function in `invoiceGenerator.ts`.
- A render/step-progression test for the wizard (React Testing Library,
  already a dependency) covering: selecting a keepsake, answering
  consent, reaching the review total, and reaching the invoice step.
- **Test-environment note (verified by spike):** the CRA/jsdom test
  environment has no global `TextEncoder`/`TextDecoder` or
  `crypto.subtle`, which both `invoiceGenerator.ts` (verification code)
  and the `jspdf` package (at import time) need. `src/setupTests.ts`
  must polyfill these from Node's built-in `util` and `crypto` modules
  before any test imports `jspdf` or calls the verification function.
  Confirmed working with `crypto.webcrypto` from Node's `crypto` module
  and `TextEncoder`/`TextDecoder` from `util`.
- **Test-environment note (verified by spike):** `jsPDF.addImage()` with
  a PNG data URL works fine in this jsdom environment (no canvas
  needed) — confirmed with a 1x1 PNG fixture. The real logo will be
  loaded via `fetch()` + `FileReader` in the browser at runtime, which
  is not exercised in unit tests; `buildInvoicePdfBlob` takes the logo
  as an already-loaded data-URL string parameter so it stays a pure,
  synchronous, testable function, separate from the browser-only
  `loadLogoDataUrl()` fetch helper.
- **Test-environment note (verified by spike):** jsdom has no
  `URL.createObjectURL`/`revokeObjectURL` (needed by `InvoiceStep` for the
  download link) — polyfilled in `setupTests.ts`.
- **Test-environment gotcha (verified by spike):** this project's
  `react-scripts` jest config sets `resetMocks: true`, which silently wipes
  any `jest.fn()`/`jest.spyOn()` implementation configured outside a
  `beforeEach` before every test runs (a module-scope
  `jest.spyOn(...).mockResolvedValue(...)` reverts to a no-op returning
  `undefined`, even on the first test). All mock/spy implementations —
  including the setupTests.ts polyfills above, which use plain functions
  instead for exactly this reason — must be configured inside `beforeEach`
  or the test body, never at module scope.

## Open items intentionally left as placeholders

- `RETURN_FEE_PLACEHOLDER` value — business owner to set.
- Social profile URLs — business owner to set.
