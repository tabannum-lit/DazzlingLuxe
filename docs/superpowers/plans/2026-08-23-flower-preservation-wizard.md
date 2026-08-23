# Flower Preservation Wizard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/send-your-flowers` lead-gen form with a 5-step wizard (details → keepsake selection → drying consent → review → branded PDF invoice) that runs entirely client-side.

**Architecture:** A thin state machine component (`SendYourFlowersWizard`) holds wizard state and renders one of five step components. Pricing/copy live in a single config file. Invoice math and PDF building live in pure, independently-testable functions in `src/utils/invoiceGenerator.ts`.

**Tech Stack:** React 19 + TypeScript (strict), Tailwind CSS, `jspdf` (already added to `package.json`), React Testing Library.

**Spec:** `docs/superpowers/specs/2026-08-23-flower-preservation-wizard-design.md`

## Global Constraints

- No backend of any kind exists or may be introduced — everything runs client-side in the browser.
- TypeScript strict mode is on (`tsconfig.json`) — no implicit `any`, all props typed.
- New components live under `src/components/flowerPreservation/`, matching the existing `components/home/`, `components/layout/` domain-folder convention.
- Currency display uses the existing `formatCurrency` helper (`src/utils/currency.ts`, `en-CA`/`CAD`) everywhere a price is shown, on-screen and in the PDF.
- `RETURN_FEE_PLACEHOLDER` and `SOCIAL_LINKS` values are deliberate placeholders for the business owner to fill in later — do not invent real-looking values.
- The consent clause text must be reproduced verbatim (see Task 1).
- `src/setupTests.ts` already polyfills `TextEncoder`/`TextDecoder`/`crypto.subtle`/`URL.createObjectURL`/`URL.revokeObjectURL` for the jsdom test environment (added in a prior spike commit) — later tasks' tests rely on this and don't need to redo it.
- `jspdf` is already installed (`package.json` has `"jspdf": "^4.2.1"`).
- This project's jest config (`react-scripts`) sets `resetMocks: true`. Any `jest.fn()` or `jest.spyOn()` implementation configured outside a `beforeEach`/test body is silently wiped (reverts to a no-op returning `undefined`) before every test runs — confirmed by spike. Always configure mock implementations inside `beforeEach` or the test itself, never at module scope.

---

### Task 1: Types and config

**Files:**
- Create: `src/components/flowerPreservation/types.ts`
- Create: `src/components/flowerPreservation/config.ts`
- Test: none (pure data/type declarations; exercised by later tasks' tests)

**Interfaces:**
- Produces (used by every later task):
  ```ts
  // types.ts
  export type KeepsakeId = 'coaster' | 'suncatcher' | 'plaque' | 'display-piece' | 'shadow-box';

  export type KeepsakeOption = {
    id: KeepsakeId;
    label: string;
    price: number;
    description: string;
  };

  export type ConsentChoice = 'retain' | 'return';

  export type CustomerDetails = {
    name: string;
    email: string;
    phone: string;
    flowerType: string;
    message: string;
  };

  export type WizardStep = 'details' | 'keepsake' | 'consent' | 'review' | 'invoice';

  export type InvoiceData = {
    invoiceNumber: string;
    issuedAt: string; // ISO 8601
    customer: CustomerDetails;
    keepsake: KeepsakeOption;
    consentChoice: ConsentChoice;
    returnFee: number;
    total: number;
    verificationCode: string;
  };
  ```
  ```ts
  // config.ts
  export const KEEPSAKE_OPTIONS: KeepsakeOption[];
  export const RETURN_FEE_PLACEHOLDER: number;
  export const CONSENT_TEXT: string;
  export const SOCIAL_LINKS: { instagram: string; facebook: string; tiktok: string };
  ```

- [ ] **Step 1: Create `types.ts`**

```ts
// src/components/flowerPreservation/types.ts
export type KeepsakeId = 'coaster' | 'suncatcher' | 'plaque' | 'display-piece' | 'shadow-box';

export type KeepsakeOption = {
  id: KeepsakeId;
  label: string;
  price: number;
  description: string;
};

export type ConsentChoice = 'retain' | 'return';

export type CustomerDetails = {
  name: string;
  email: string;
  phone: string;
  flowerType: string;
  message: string;
};

export type WizardStep = 'details' | 'keepsake' | 'consent' | 'review' | 'invoice';

export type InvoiceData = {
  invoiceNumber: string;
  issuedAt: string;
  customer: CustomerDetails;
  keepsake: KeepsakeOption;
  consentChoice: ConsentChoice;
  returnFee: number;
  total: number;
  verificationCode: string;
};
```

- [ ] **Step 2: Create `config.ts`**

```ts
// src/components/flowerPreservation/config.ts
import { KeepsakeOption } from './types';

export const KEEPSAKE_OPTIONS: KeepsakeOption[] = [
  {
    id: 'coaster',
    label: 'Coaster',
    price: 80,
    description: 'An everyday keepsake coaster with your preserved flowers set in resin.',
  },
  {
    id: 'suncatcher',
    label: 'Suncatcher',
    price: 80,
    description: 'A light-catching resin piece designed to hang in a window.',
  },
  {
    id: 'plaque',
    label: 'Plaque',
    price: 80,
    description: 'A decorative resin plaque for shelf or wall display.',
  },
  {
    id: 'display-piece',
    label: 'Display Piece',
    price: 180,
    description: 'A larger showcase piece built around your preserved flowers.',
  },
  {
    id: 'shadow-box',
    label: 'Shadow Box',
    price: 70,
    description: 'A framed shadow box arrangement of your preserved flowers.',
  },
];

// Placeholder value — Dazzling Luxe to confirm the real return/handling fee
// before launch. Change this single constant to update the fee everywhere
// (review screen, invoice PDF, and totals).
export const RETURN_FEE_PLACEHOLDER = 25;

export const CONSENT_TEXT =
  "Because flower preservation requires additional flowers for testing, breakage, colour changes and design selection, Dazzling Luxe may retain and reuse excess prepared flowers that are not incorporated into the customer's commissioned piece. If you would like all unused flowers returned, please request this before the preservation process begins; additional preparation/handling fees may apply.";

// Placeholder handles — Dazzling Luxe to confirm real profile URLs before launch.
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/dazzlingluxe',
  facebook: 'https://facebook.com/dazzlingluxe',
  tiktok: 'https://tiktok.com/@dazzlingluxe',
};
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors referencing these two new files.

- [ ] **Step 4: Commit**

```bash
git add src/components/flowerPreservation/types.ts src/components/flowerPreservation/config.ts
git commit -m "feat: add flower preservation wizard types and config"
```

---

### Task 2: Invoice calculation + verification code (`invoiceGenerator.ts`, part 1)

**Files:**
- Create: `src/utils/invoiceGenerator.ts`
- Test: `src/utils/invoiceGenerator.test.ts`

**Interfaces:**
- Consumes: `KeepsakeOption`, `ConsentChoice`, `CustomerDetails`, `InvoiceData` from `../components/flowerPreservation/types`; `RETURN_FEE_PLACEHOLDER` from `../components/flowerPreservation/config`.
- Produces (used by Task 3 and by `ReviewStep`/`SendYourFlowersWizard` in Task 6):
  ```ts
  export const calculateReturnFee: (consentChoice: ConsentChoice) => number;
  export const calculateTotal: (keepsakePrice: number, returnFee: number) => number;
  export const generateInvoiceNumber: (issuedAt: Date) => string; // "DL-YYYYMMDD-XXXX"
  export const buildVerificationPayload: (params: {
    invoiceNumber: string;
    email: string;
    total: number;
    keepsakeId: string;
  }) => string;
  export const computeVerificationCode: (payload: string) => Promise<string>; // 8 uppercase hex chars
  export const buildInvoiceData: (params: {
    customer: CustomerDetails;
    keepsake: KeepsakeOption;
    consentChoice: ConsentChoice;
    issuedAt: Date;
  }) => Promise<InvoiceData>;
  ```

- [ ] **Step 1: Write the failing tests**

```ts
// src/utils/invoiceGenerator.test.ts
import {
  calculateReturnFee,
  calculateTotal,
  generateInvoiceNumber,
  buildVerificationPayload,
  computeVerificationCode,
  buildInvoiceData,
} from './invoiceGenerator';
import { RETURN_FEE_PLACEHOLDER } from '../components/flowerPreservation/config';
import { KeepsakeOption, CustomerDetails } from '../components/flowerPreservation/types';

describe('calculateReturnFee', () => {
  it('returns the placeholder fee when the customer wants flowers returned', () => {
    expect(calculateReturnFee('return')).toBe(RETURN_FEE_PLACEHOLDER);
  });

  it('returns 0 when the customer lets Dazzling Luxe retain unused flowers', () => {
    expect(calculateReturnFee('retain')).toBe(0);
  });
});

describe('calculateTotal', () => {
  it('adds the return fee to the keepsake price', () => {
    expect(calculateTotal(80, 25)).toBe(105);
  });

  it('equals the keepsake price when there is no return fee', () => {
    expect(calculateTotal(180, 0)).toBe(180);
  });
});

describe('generateInvoiceNumber', () => {
  it('formats as DL-YYYYMMDD-XXXX with a 4-digit random suffix', () => {
    const issuedAt = new Date('2026-08-23T12:00:00Z');
    const invoiceNumber = generateInvoiceNumber(issuedAt);
    expect(invoiceNumber).toMatch(/^DL-20260823-\d{4}$/);
  });

  it('produces different suffixes across calls', () => {
    const issuedAt = new Date('2026-08-23T12:00:00Z');
    const numbers = new Set(Array.from({ length: 20 }, () => generateInvoiceNumber(issuedAt)));
    expect(numbers.size).toBeGreaterThan(1);
  });
});

describe('buildVerificationPayload', () => {
  it('joins the invoice fields with a fixed delimiter', () => {
    const payload = buildVerificationPayload({
      invoiceNumber: 'DL-20260823-0001',
      email: 'customer@example.com',
      total: 105,
      keepsakeId: 'coaster',
    });
    expect(payload).toBe('DL-20260823-0001|customer@example.com|105|coaster');
  });
});

describe('computeVerificationCode', () => {
  it('returns an 8-character uppercase hex code', async () => {
    const code = await computeVerificationCode('DL-20260823-0001|customer@example.com|105|coaster');
    expect(code).toMatch(/^[0-9A-F]{8}$/);
  });

  it('is deterministic for the same payload', async () => {
    const codeA = await computeVerificationCode('same-payload');
    const codeB = await computeVerificationCode('same-payload');
    expect(codeA).toBe(codeB);
  });

  it('changes when the payload changes', async () => {
    const codeA = await computeVerificationCode('payload-a');
    const codeB = await computeVerificationCode('payload-b');
    expect(codeA).not.toBe(codeB);
  });
});

describe('buildInvoiceData', () => {
  const customer: CustomerDetails = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '',
    flowerType: 'Roses',
    message: '',
  };
  const keepsake: KeepsakeOption = {
    id: 'coaster',
    label: 'Coaster',
    price: 80,
    description: 'test',
  };

  it('assembles a complete InvoiceData with the return fee applied', async () => {
    const issuedAt = new Date('2026-08-23T12:00:00Z');
    const invoice = await buildInvoiceData({ customer, keepsake, consentChoice: 'return', issuedAt });

    expect(invoice.customer).toBe(customer);
    expect(invoice.keepsake).toBe(keepsake);
    expect(invoice.consentChoice).toBe('return');
    expect(invoice.returnFee).toBe(RETURN_FEE_PLACEHOLDER);
    expect(invoice.total).toBe(80 + RETURN_FEE_PLACEHOLDER);
    expect(invoice.invoiceNumber).toMatch(/^DL-20260823-\d{4}$/);
    expect(invoice.issuedAt).toBe(issuedAt.toISOString());
    expect(invoice.verificationCode).toMatch(/^[0-9A-F]{8}$/);
  });

  it('applies no return fee when the customer lets flowers be retained', async () => {
    const issuedAt = new Date('2026-08-23T12:00:00Z');
    const invoice = await buildInvoiceData({ customer, keepsake, consentChoice: 'retain', issuedAt });

    expect(invoice.returnFee).toBe(0);
    expect(invoice.total).toBe(80);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `CI=true npx react-scripts test src/utils/invoiceGenerator.test.ts --watchAll=false`
Expected: FAIL — `Cannot find module './invoiceGenerator'`

- [ ] **Step 3: Write the implementation**

```ts
// src/utils/invoiceGenerator.ts
import { ConsentChoice, CustomerDetails, InvoiceData, KeepsakeOption } from '../components/flowerPreservation/types';
import { RETURN_FEE_PLACEHOLDER } from '../components/flowerPreservation/config';

export const calculateReturnFee = (consentChoice: ConsentChoice): number =>
  consentChoice === 'return' ? RETURN_FEE_PLACEHOLDER : 0;

export const calculateTotal = (keepsakePrice: number, returnFee: number): number =>
  keepsakePrice + returnFee;

const pad = (value: number, length: number): string => String(value).padStart(length, '0');

export const generateInvoiceNumber = (issuedAt: Date): string => {
  const datePart = `${issuedAt.getUTCFullYear()}${pad(issuedAt.getUTCMonth() + 1, 2)}${pad(issuedAt.getUTCDate(), 2)}`;
  const suffix = pad(Math.floor(Math.random() * 10000), 4);
  return `DL-${datePart}-${suffix}`;
};

export const buildVerificationPayload = (params: {
  invoiceNumber: string;
  email: string;
  total: number;
  keepsakeId: string;
}): string => `${params.invoiceNumber}|${params.email}|${params.total}|${params.keepsakeId}`;

export const computeVerificationCode = async (payload: string): Promise<string> => {
  const encoded = new TextEncoder().encode(payload);
  const digest = await crypto.subtle.digest('SHA-256', encoded);
  const hex = Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
  return hex.slice(0, 8).toUpperCase();
};

export const buildInvoiceData = async (params: {
  customer: CustomerDetails;
  keepsake: KeepsakeOption;
  consentChoice: ConsentChoice;
  issuedAt: Date;
}): Promise<InvoiceData> => {
  const { customer, keepsake, consentChoice, issuedAt } = params;
  const returnFee = calculateReturnFee(consentChoice);
  const total = calculateTotal(keepsake.price, returnFee);
  const invoiceNumber = generateInvoiceNumber(issuedAt);
  const verificationCode = await computeVerificationCode(
    buildVerificationPayload({ invoiceNumber, email: customer.email, total, keepsakeId: keepsake.id })
  );

  return {
    invoiceNumber,
    issuedAt: issuedAt.toISOString(),
    customer,
    keepsake,
    consentChoice,
    returnFee,
    total,
    verificationCode,
  };
};
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `CI=true npx react-scripts test src/utils/invoiceGenerator.test.ts --watchAll=false`
Expected: PASS — all tests green.

- [ ] **Step 5: Commit**

```bash
git add src/utils/invoiceGenerator.ts src/utils/invoiceGenerator.test.ts
git commit -m "feat: add invoice pricing and verification-code calculations"
```

---

### Task 3: PDF builder (`invoiceGenerator.ts`, part 2)

**Files:**
- Modify: `src/utils/invoiceGenerator.ts`
- Test: `src/utils/invoiceGenerator.pdf.test.ts`

**Interfaces:**
- Consumes: `InvoiceData` from Task 1; `formatCurrency` from `./currency`; `jsPDF` from `jspdf`.
- Produces (used by `SendYourFlowersWizard` in Task 6 and `InvoiceStep` in Task 5):
  ```ts
  export const buildInvoicePdfBlob: (invoice: InvoiceData, logoDataUrl: string) => Blob;
  export const loadLogoDataUrl: () => Promise<string>;
  ```

- [ ] **Step 1: Write the failing test**

```ts
// src/utils/invoiceGenerator.pdf.test.ts
import { buildInvoicePdfBlob } from './invoiceGenerator';
import { InvoiceData } from '../components/flowerPreservation/types';

const TINY_PNG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

const invoice: InvoiceData = {
  invoiceNumber: 'DL-20260823-0001',
  issuedAt: '2026-08-23T12:00:00.000Z',
  customer: { name: 'Jane Doe', email: 'jane@example.com', phone: '', flowerType: 'Roses', message: '' },
  keepsake: { id: 'coaster', label: 'Coaster', price: 80, description: 'test' },
  consentChoice: 'return',
  returnFee: 25,
  total: 105,
  verificationCode: 'ABCD1234',
};

test('builds a non-empty application/pdf blob', () => {
  const blob = buildInvoicePdfBlob(invoice, TINY_PNG);
  expect(blob).toBeInstanceOf(Blob);
  expect(blob.type).toBe('application/pdf');
  expect(blob.size).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `CI=true npx react-scripts test src/utils/invoiceGenerator.pdf.test.ts --watchAll=false`
Expected: FAIL — `buildInvoicePdfBlob is not a function` (not yet exported).

- [ ] **Step 3: Add the PDF builder to `invoiceGenerator.ts`**

Append to `src/utils/invoiceGenerator.ts`:

```ts
import { jsPDF } from 'jspdf';
import { formatCurrency } from './currency';
import { CONSENT_TEXT } from '../components/flowerPreservation/config';

const COLORS = {
  cream: [255, 248, 240] as [number, number, number],
  warmGold: [200, 169, 110] as [number, number, number],
  charcoal: [44, 44, 44] as [number, number, number],
  softBrown: [107, 91, 79] as [number, number, number],
};

// Keeps the consent wording used in the PDF pulled from the same shared
// config the on-screen ConsentModal uses, so the two can never drift apart.
const CONSENT_TEXT_FOR_PDF = (invoice: InvoiceData): string =>
  `${CONSENT_TEXT} (Consent given: ${invoice.consentChoice === 'return' ? 'return unused flowers' : 'Dazzling Luxe may retain unused flowers'}.)`;

export const loadLogoDataUrl = async (): Promise<string> => {
  const response = await fetch('/logo-dazz-transparent.png');
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const buildInvoicePdfBlob = (invoice: InvoiceData, logoDataUrl: string): Blob => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 20;

  // Header band
  doc.setFillColor(...COLORS.cream);
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.addImage(logoDataUrl, 'PNG', marginX, 8, 24, 24);
  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...COLORS.charcoal);
  doc.text('Dazzling Luxe', marginX + 30, 20);
  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.softBrown);
  doc.text('Flower Preservation Invoice', marginX + 30, 28);
  doc.setDrawColor(...COLORS.warmGold);
  doc.setLineWidth(0.8);
  doc.line(marginX, 40, pageWidth - marginX, 40);

  // Invoice meta
  let y = 52;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.softBrown);
  doc.text(`Invoice #: ${invoice.invoiceNumber}`, marginX, y);
  doc.text(`Date: ${new Date(invoice.issuedAt).toLocaleDateString('en-CA')}`, pageWidth - marginX, y, { align: 'right' });

  y += 10;
  doc.setTextColor(...COLORS.charcoal);
  doc.setFont('helvetica', 'bold');
  doc.text('Bill To', marginX, y);
  doc.setFont('helvetica', 'normal');
  y += 6;
  doc.text(invoice.customer.name, marginX, y);
  y += 5;
  if (invoice.customer.email) {
    doc.text(invoice.customer.email, marginX, y);
    y += 5;
  }
  if (invoice.customer.phone) {
    doc.text(invoice.customer.phone, marginX, y);
    y += 5;
  }

  // Line items table
  y += 8;
  const tableTop = y;
  doc.setDrawColor(...COLORS.warmGold);
  doc.setLineWidth(0.3);
  doc.line(marginX, tableTop, pageWidth - marginX, tableTop);
  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Item', marginX, y);
  doc.text('Price', pageWidth - marginX, y, { align: 'right' });
  y += 3;
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.text(invoice.keepsake.label, marginX, y);
  doc.text(formatCurrency(invoice.keepsake.price), pageWidth - marginX, y, { align: 'right' });

  if (invoice.returnFee > 0) {
    y += 7;
    doc.text('Flower return / handling fee', marginX, y);
    doc.text(formatCurrency(invoice.returnFee), pageWidth - marginX, y, { align: 'right' });
  }

  y += 5;
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('Total', marginX, y);
  doc.text(formatCurrency(invoice.total), pageWidth - marginX, y, { align: 'right' });
  doc.setDrawColor(...COLORS.warmGold);
  doc.setLineWidth(0.6);
  doc.line(pageWidth - marginX - 40, y + 2, pageWidth - marginX, y + 2);

  // Consent callout
  y += 14;
  doc.setDrawColor(...COLORS.warmGold);
  doc.setFillColor(...COLORS.cream);
  const consentLines = doc.splitTextToSize(CONSENT_TEXT_FOR_PDF(invoice), pageWidth - marginX * 2 - 8);
  const boxHeight = consentLines.length * 5 + 10;
  doc.roundedRect(marginX, y, pageWidth - marginX * 2, boxHeight, 2, 2, 'FD');
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.softBrown);
  doc.text(consentLines, marginX + 4, y + 7);
  y += boxHeight + 12;

  // Footer
  doc.setDrawColor(...COLORS.warmGold);
  doc.setLineWidth(0.4);
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 6;
  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.softBrown);
  doc.text(`Verification code: ${invoice.verificationCode}`, marginX, y);
  y += 8;
  doc.setFont('times', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.charcoal);
  doc.text('Thank you for trusting us with your flowers.', marginX, y);

  return doc.output('blob');
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `CI=true npx react-scripts test src/utils/invoiceGenerator.pdf.test.ts --watchAll=false`
Expected: PASS

- [ ] **Step 5: Run the full invoiceGenerator test suite together**

Run: `CI=true npx react-scripts test src/utils/invoiceGenerator --watchAll=false`
Expected: PASS — both `invoiceGenerator.test.ts` and `invoiceGenerator.pdf.test.ts` green.

- [ ] **Step 6: Commit**

```bash
git add src/utils/invoiceGenerator.ts src/utils/invoiceGenerator.pdf.test.ts
git commit -m "feat: add branded PDF invoice builder"
```

---

### Task 4: DetailsStep, KeepsakeStep, ConsentModal

**Files:**
- Create: `src/components/flowerPreservation/DetailsStep.tsx`
- Create: `src/components/flowerPreservation/KeepsakeStep.tsx`
- Create: `src/components/flowerPreservation/ConsentModal.tsx`
- Test: `src/components/flowerPreservation/DetailsStep.test.tsx`
- Test: `src/components/flowerPreservation/KeepsakeStep.test.tsx`
- Test: `src/components/flowerPreservation/ConsentModal.test.tsx`

**Interfaces:**
- Consumes: `KeepsakeOption`, `ConsentChoice`, `CustomerDetails` from `./types`; `KEEPSAKE_OPTIONS`, `CONSENT_TEXT`, `RETURN_FEE_PLACEHOLDER` from `./config`; `formatCurrency` from `../../utils/currency`.
- Produces (used by `SendYourFlowersWizard` in Task 6):
  ```ts
  export type DetailsStepProps = {
    details: CustomerDetails;
    onSubmit: (details: CustomerDetails) => void;
  };
  const DetailsStep: (props: DetailsStepProps) => JSX.Element;

  export type KeepsakeStepProps = {
    selected: KeepsakeOption | null;
    onSelect: (option: KeepsakeOption) => void;
    onBack: () => void;
  };
  const KeepsakeStep: (props: KeepsakeStepProps) => JSX.Element;

  export type ConsentModalProps = {
    keepsake: KeepsakeOption;
    onChoose: (choice: ConsentChoice) => void;
    onBack: () => void;
  };
  const ConsentModal: (props: ConsentModalProps) => JSX.Element;
  ```

- [ ] **Step 1: Write the failing tests**

```tsx
// src/components/flowerPreservation/DetailsStep.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DetailsStep from './DetailsStep';

const emptyDetails = { name: '', email: '', phone: '', flowerType: '', message: '' };

test('requires a name and at least one contact method before continuing', async () => {
  const onSubmit = jest.fn();
  render(<DetailsStep details={emptyDetails} onSubmit={onSubmit} />);

  await userEvent.click(screen.getByRole('button', { name: /continue/i }));
  expect(onSubmit).not.toHaveBeenCalled();

  await userEvent.type(screen.getByLabelText(/full name/i), 'Jane Doe');
  await userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');
  await userEvent.click(screen.getByRole('button', { name: /continue/i }));

  expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ name: 'Jane Doe', email: 'jane@example.com' }));
});
```

```tsx
// src/components/flowerPreservation/KeepsakeStep.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import KeepsakeStep from './KeepsakeStep';
import { KEEPSAKE_OPTIONS } from './config';

test('lists every keepsake option with its price and selects one on click', async () => {
  const onSelect = jest.fn();
  render(<KeepsakeStep selected={null} onSelect={onSelect} onBack={jest.fn()} />);

  KEEPSAKE_OPTIONS.forEach((option) => {
    expect(screen.getByText(option.label)).toBeInTheDocument();
  });

  await userEvent.click(screen.getByText('Shadow Box'));
  expect(onSelect).toHaveBeenCalledWith(KEEPSAKE_OPTIONS.find((o) => o.id === 'shadow-box'));
});
```

```tsx
// src/components/flowerPreservation/ConsentModal.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConsentModal from './ConsentModal';
import { KEEPSAKE_OPTIONS, RETURN_FEE_PLACEHOLDER } from './config';
import { formatCurrency } from '../../utils/currency';

test('shows the consent text and the return fee, and reports the chosen consent option', async () => {
  const onChoose = jest.fn();
  const keepsake = KEEPSAKE_OPTIONS[0];
  render(<ConsentModal keepsake={keepsake} onChoose={onChoose} onBack={jest.fn()} />);

  expect(screen.getByText(/dazzling luxe may retain and reuse excess prepared flowers/i)).toBeInTheDocument();
  expect(screen.getByText(new RegExp(formatCurrency(RETURN_FEE_PLACEHOLDER).replace('$', '\\$')))).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /return my unused flowers/i }));
  expect(onChoose).toHaveBeenCalledWith('return');
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `CI=true npx react-scripts test src/components/flowerPreservation --watchAll=false`
Expected: FAIL — modules don't exist yet.

- [ ] **Step 3: Implement `DetailsStep.tsx`**

```tsx
// src/components/flowerPreservation/DetailsStep.tsx
import { FormEvent, useState } from 'react';
import { CustomerDetails } from './types';

export type DetailsStepProps = {
  details: CustomerDetails;
  onSubmit: (details: CustomerDetails) => void;
};

const DetailsStep = ({ details, onSubmit }: DetailsStepProps) => {
  const [form, setForm] = useState<CustomerDetails>(details);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof CustomerDetails, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!form.email.trim() && !form.phone.trim()) {
      setError('Please provide an email or phone number so we can reach you.');
      return;
    }
    setError(null);
    onSubmit(form);
  };

  return (
    <section className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-warmGold uppercase tracking-[0.2em] text-sm font-bold">Step 1 of 5</p>
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal mt-3">Your Details</h1>
        <p className="mt-4 text-softBrown max-w-lg mx-auto">
          Tell us a little about you and your flowers before you choose a keepsake.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-charcoal mb-2">Full Name *</label>
            <input id="name" type="text" value={form.name} onChange={(e) => update('name', e.target.value)}
              className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm outline-none focus:border-warmGold transition-colors" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-charcoal mb-2">Email</label>
            <input id="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)}
              className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm outline-none focus:border-warmGold transition-colors" />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-charcoal mb-2">Phone</label>
            <input id="phone" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)}
              className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm outline-none focus:border-warmGold transition-colors" />
          </div>
          <div>
            <label htmlFor="flowerType" className="block text-sm font-bold text-charcoal mb-2">Flower Type</label>
            <input id="flowerType" type="text" value={form.flowerType} onChange={(e) => update('flowerType', e.target.value)}
              placeholder="e.g. Roses, Lilies, Mixed Bouquet"
              className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm outline-none focus:border-warmGold transition-colors" />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-bold text-charcoal mb-2">Tell Us Your Story</label>
          <textarea id="message" rows={4} value={form.message} onChange={(e) => update('message', e.target.value)}
            placeholder="Share the story behind your flowers..."
            className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm outline-none focus:border-warmGold transition-colors resize-none" />
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button type="submit"
          className="w-full py-4 rounded-full bg-warmGold text-white font-bold uppercase tracking-wider transition-all hover:bg-deepGold hover:shadow-lg">
          Continue
        </button>
      </form>
    </section>
  );
};

export default DetailsStep;
```

- [ ] **Step 4: Implement `KeepsakeStep.tsx`**

```tsx
// src/components/flowerPreservation/KeepsakeStep.tsx
import { KeepsakeOption } from './types';
import { KEEPSAKE_OPTIONS } from './config';
import { formatCurrency } from '../../utils/currency';

export type KeepsakeStepProps = {
  selected: KeepsakeOption | null;
  onSelect: (option: KeepsakeOption) => void;
  onBack: () => void;
};

const KeepsakeStep = ({ selected, onSelect, onBack }: KeepsakeStepProps) => {
  return (
    <section className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-warmGold uppercase tracking-[0.2em] text-sm font-bold">Step 2 of 5</p>
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal mt-3">Choose Your Keepsake</h1>
        <p className="mt-4 text-softBrown max-w-lg mx-auto">
          Send your flowers to dry and make a piece to hold on to it forever.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {KEEPSAKE_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option)}
            className={`text-left rounded-2xl border p-6 transition-all hover:border-warmGold hover:shadow-lg ${
              selected?.id === option.id ? 'border-warmGold shadow-lg bg-warmGold/5' : 'border-beige bg-white'
            }`}
          >
            <h3 className="font-heading text-2xl text-charcoal">{option.label}</h3>
            <p className="mt-2 text-sm text-softBrown">{option.description}</p>
            <p className="mt-4 text-lg font-bold text-warmGold">{formatCurrency(option.price)}</p>
          </button>
        ))}
      </div>

      <button type="button" onClick={onBack} className="mt-8 text-sm font-semibold text-softBrown hover:text-charcoal">
        ← Back
      </button>
    </section>
  );
};

export default KeepsakeStep;
```

- [ ] **Step 5: Implement `ConsentModal.tsx`**

```tsx
// src/components/flowerPreservation/ConsentModal.tsx
import { ConsentChoice, KeepsakeOption } from './types';
import { CONSENT_TEXT, RETURN_FEE_PLACEHOLDER } from './config';
import { formatCurrency } from '../../utils/currency';

export type ConsentModalProps = {
  keepsake: KeepsakeOption;
  onChoose: (choice: ConsentChoice) => void;
  onBack: () => void;
};

const ConsentModal = ({ keepsake, onChoose, onBack }: ConsentModalProps) => {
  return (
    <div className="fixed inset-0 z-[var(--z-index-modal)] flex items-center justify-center bg-black/45 p-4" role="dialog" aria-modal="true" aria-label="Flower drying consent">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-xl">
        <p className="text-warmGold uppercase tracking-[0.2em] text-sm font-bold">Step 3 of 5</p>
        <h2 className="font-heading text-3xl text-charcoal mt-2">Flower Drying Consent</h2>
        <p className="mt-4 text-sm text-softBrown leading-relaxed">{CONSENT_TEXT}</p>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={() => onChoose('retain')}
            className="w-full text-left rounded-xl border border-beige p-4 transition-colors hover:border-warmGold"
          >
            <span className="block font-bold text-charcoal">Dazzling Luxe may keep unused flowers</span>
            <span className="block text-sm text-softBrown mt-1">No additional charge.</span>
          </button>
          <button
            type="button"
            onClick={() => onChoose('return')}
            className="w-full text-left rounded-xl border border-beige p-4 transition-colors hover:border-warmGold"
          >
            <span className="block font-bold text-charcoal">Return my unused flowers</span>
            <span className="block text-sm text-softBrown mt-1">
              Additional handling fee: {formatCurrency(RETURN_FEE_PLACEHOLDER)}
            </span>
          </button>
        </div>

        <p className="mt-4 text-xs text-softBrown">Keepsake selected: {keepsake.label}</p>

        <button type="button" onClick={onBack} className="mt-6 text-sm font-semibold text-softBrown hover:text-charcoal">
          ← Back to keepsake selection
        </button>
      </div>
    </div>
  );
};

export default ConsentModal;
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `CI=true npx react-scripts test src/components/flowerPreservation --watchAll=false`
Expected: PASS for `DetailsStep.test.tsx`, `KeepsakeStep.test.tsx`, `ConsentModal.test.tsx`. (Other tests in that folder don't exist yet — ignore "no tests found" for files not yet created.)

- [ ] **Step 7: Commit**

```bash
git add src/components/flowerPreservation/DetailsStep.tsx src/components/flowerPreservation/KeepsakeStep.tsx src/components/flowerPreservation/ConsentModal.tsx src/components/flowerPreservation/DetailsStep.test.tsx src/components/flowerPreservation/KeepsakeStep.test.tsx src/components/flowerPreservation/ConsentModal.test.tsx
git commit -m "feat: add details, keepsake selection, and consent steps"
```

---

### Task 5: ReviewStep and InvoiceStep

**Files:**
- Create: `src/components/flowerPreservation/ReviewStep.tsx`
- Create: `src/components/flowerPreservation/InvoiceStep.tsx`
- Test: `src/components/flowerPreservation/ReviewStep.test.tsx`
- Test: `src/components/flowerPreservation/InvoiceStep.test.tsx`

**Interfaces:**
- Consumes: `CustomerDetails`, `KeepsakeOption`, `ConsentChoice`, `InvoiceData` from `./types`; `SOCIAL_LINKS` from `./config`; `formatCurrency` from `../../utils/currency`.
- Produces (used by `SendYourFlowersWizard` in Task 6):
  ```ts
  export type ReviewStepProps = {
    details: CustomerDetails;
    keepsake: KeepsakeOption;
    consentChoice: ConsentChoice;
    returnFee: number;
    total: number;
    onConfirm: () => void;
    onBack: () => void;
    generating: boolean;
    error: string | null;
  };
  const ReviewStep: (props: ReviewStepProps) => JSX.Element;

  export type InvoiceStepProps = {
    invoice: InvoiceData;
    pdfBlob: Blob;
    onStartOver: () => void;
  };
  const InvoiceStep: (props: InvoiceStepProps) => JSX.Element;
  ```

- [ ] **Step 1: Write the failing tests**

```tsx
// src/components/flowerPreservation/ReviewStep.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewStep from './ReviewStep';
import { KEEPSAKE_OPTIONS } from './config';

const details = { name: 'Jane Doe', email: 'jane@example.com', phone: '', flowerType: 'Roses', message: '' };

test('shows the line items and total, and confirms on click', async () => {
  const onConfirm = jest.fn();
  render(
    <ReviewStep
      details={details}
      keepsake={KEEPSAKE_OPTIONS[0]}
      consentChoice="return"
      returnFee={25}
      total={105}
      onConfirm={onConfirm}
      onBack={jest.fn()}
      generating={false}
      error={null}
    />
  );

  expect(screen.getByText(/coaster/i)).toBeInTheDocument();
  expect(screen.getByText('$105.00')).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /generate invoice/i }));
  expect(onConfirm).toHaveBeenCalled();
});

test('shows an error message and keeps the confirm button enabled to retry', () => {
  render(
    <ReviewStep
      details={details}
      keepsake={KEEPSAKE_OPTIONS[0]}
      consentChoice="retain"
      returnFee={0}
      total={80}
      onConfirm={jest.fn()}
      onBack={jest.fn()}
      generating={false}
      error="Could not generate the invoice. Please try again."
    />
  );

  expect(screen.getByText(/could not generate the invoice/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /generate invoice/i })).not.toBeDisabled();
});
```

```tsx
// src/components/flowerPreservation/InvoiceStep.test.tsx
import { render, screen } from '@testing-library/react';
import InvoiceStep from './InvoiceStep';
import { InvoiceData } from './types';

const invoice: InvoiceData = {
  invoiceNumber: 'DL-20260823-0001',
  issuedAt: '2026-08-23T12:00:00.000Z',
  customer: { name: 'Jane Doe', email: 'jane@example.com', phone: '', flowerType: 'Roses', message: '' },
  keepsake: { id: 'coaster', label: 'Coaster', price: 80, description: 'test' },
  consentChoice: 'retain',
  returnFee: 0,
  total: 80,
  verificationCode: 'ABCD1234',
};

test('shows the invoice summary and a download link plus social buttons', () => {
  const pdfBlob = new Blob(['%PDF-1.4'], { type: 'application/pdf' });
  render(<InvoiceStep invoice={invoice} pdfBlob={pdfBlob} onStartOver={jest.fn()} />);

  expect(screen.getByText(/DL-20260823-0001/)).toBeInTheDocument();
  expect(screen.getByText(/ABCD1234/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /download invoice/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /instagram/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /facebook/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /tiktok/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `CI=true npx react-scripts test src/components/flowerPreservation/ReviewStep.test.tsx src/components/flowerPreservation/InvoiceStep.test.tsx --watchAll=false`
Expected: FAIL — modules don't exist yet.

- [ ] **Step 3: Implement `ReviewStep.tsx`**

```tsx
// src/components/flowerPreservation/ReviewStep.tsx
import { ConsentChoice, CustomerDetails, KeepsakeOption } from './types';
import { formatCurrency } from '../../utils/currency';

export type ReviewStepProps = {
  details: CustomerDetails;
  keepsake: KeepsakeOption;
  consentChoice: ConsentChoice;
  returnFee: number;
  total: number;
  onConfirm: () => void;
  onBack: () => void;
  generating: boolean;
  error: string | null;
};

const ReviewStep = ({ details, keepsake, consentChoice, returnFee, total, onConfirm, onBack, generating, error }: ReviewStepProps) => {
  return (
    <section className="max-w-xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-warmGold uppercase tracking-[0.2em] text-sm font-bold">Step 4 of 5</p>
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal mt-3">Review Your Order</h1>
      </div>

      <div className="rounded-2xl border border-beige bg-white p-6 space-y-4">
        <div className="flex justify-between text-sm text-softBrown">
          <span>Name</span>
          <span className="font-bold text-charcoal">{details.name}</span>
        </div>
        <div className="flex justify-between text-sm text-softBrown">
          <span>{keepsake.label}</span>
          <span className="font-bold text-charcoal">{formatCurrency(keepsake.price)}</span>
        </div>
        {returnFee > 0 ? (
          <div className="flex justify-between text-sm text-softBrown">
            <span>Flower return / handling fee</span>
            <span className="font-bold text-charcoal">{formatCurrency(returnFee)}</span>
          </div>
        ) : (
          <div className="flex justify-between text-sm text-softBrown">
            <span>Unused flowers</span>
            <span className="font-bold text-charcoal">Retained by Dazzling Luxe</span>
          </div>
        )}
        <div className="border-t border-beige pt-4 flex justify-between text-lg">
          <span className="font-bold text-charcoal">Total</span>
          <span className="font-bold text-warmGold">{formatCurrency(total)}</span>
        </div>
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          onClick={onConfirm}
          disabled={generating}
          className="w-full py-4 rounded-full bg-warmGold text-white font-bold uppercase tracking-wider transition-all hover:bg-deepGold hover:shadow-lg disabled:opacity-60"
        >
          {generating ? 'Generating…' : 'Generate Invoice'}
        </button>
        <button type="button" onClick={onBack} className="text-sm font-semibold text-softBrown hover:text-charcoal">
          ← Back
        </button>
      </div>
    </section>
  );
};

export default ReviewStep;
```

- [ ] **Step 4: Implement `InvoiceStep.tsx`**

```tsx
// src/components/flowerPreservation/InvoiceStep.tsx
import { useMemo } from 'react';
import { InvoiceData } from './types';
import { SOCIAL_LINKS } from './config';
import { formatCurrency } from '../../utils/currency';

export type InvoiceStepProps = {
  invoice: InvoiceData;
  pdfBlob: Blob;
  onStartOver: () => void;
};

const InvoiceStep = ({ invoice, pdfBlob, onStartOver }: InvoiceStepProps) => {
  const pdfUrl = useMemo(() => URL.createObjectURL(pdfBlob), [pdfBlob]);
  const fileName = `dazzling-luxe-invoice-${invoice.invoiceNumber}.pdf`;

  const handleShare = async () => {
    const file = new File([pdfBlob], fileName, { type: 'application/pdf' });
    const nav = navigator as Navigator & { canShare?: (data: { files: File[] }) => boolean };
    if (nav.canShare && nav.canShare({ files: [file] }) && navigator.share) {
      try {
        await navigator.share({ files: [file], title: 'Dazzling Luxe Invoice' });
        return;
      } catch {
        // User cancelled or share failed — fall through to social links below.
      }
    }
  };

  return (
    <section className="max-w-xl mx-auto text-center">
      <div className="text-5xl mb-6">🌸</div>
      <p className="text-warmGold uppercase tracking-[0.2em] text-sm font-bold">Step 5 of 5</p>
      <h1 className="font-heading text-4xl md:text-5xl text-charcoal mt-3">Your Invoice Is Ready</h1>

      <div className="mt-8 rounded-2xl border border-beige bg-white p-6 text-left space-y-2">
        <p className="text-sm text-softBrown">Invoice #: <span className="font-bold text-charcoal">{invoice.invoiceNumber}</span></p>
        <p className="text-sm text-softBrown">Keepsake: <span className="font-bold text-charcoal">{invoice.keepsake.label}</span></p>
        <p className="text-sm text-softBrown">Total: <span className="font-bold text-charcoal">{formatCurrency(invoice.total)}</span></p>
        <p className="text-sm text-softBrown">Verification code: <span className="font-mono font-bold text-charcoal">{invoice.verificationCode}</span></p>
      </div>

      <a
        href={pdfUrl}
        download={fileName}
        className="mt-8 inline-block w-full py-4 rounded-full bg-warmGold text-white font-bold uppercase tracking-wider transition-all hover:bg-deepGold hover:shadow-lg"
      >
        Download Invoice
      </a>

      <button
        type="button"
        onClick={handleShare}
        className="mt-4 w-full py-3 rounded-full border border-warmGold text-warmGold font-bold uppercase tracking-wider transition-all hover:bg-warmGold/10"
      >
        Share Invoice
      </button>

      <p className="mt-8 text-sm text-softBrown">
        Please download the invoice above and send it to us on one of our socials so we can confirm your order:
      </p>
      <div className="mt-4 flex justify-center gap-4">
        <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="rounded-full border border-beige px-5 py-2 text-sm font-bold text-charcoal hover:border-warmGold hover:text-warmGold">
          Instagram
        </a>
        <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="rounded-full border border-beige px-5 py-2 text-sm font-bold text-charcoal hover:border-warmGold hover:text-warmGold">
          Facebook
        </a>
        <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noreferrer" className="rounded-full border border-beige px-5 py-2 text-sm font-bold text-charcoal hover:border-warmGold hover:text-warmGold">
          TikTok
        </a>
      </div>

      <button type="button" onClick={onStartOver} className="mt-10 text-sm font-semibold text-softBrown hover:text-charcoal">
        Start a new request
      </button>
    </section>
  );
};

export default InvoiceStep;
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `CI=true npx react-scripts test src/components/flowerPreservation/ReviewStep.test.tsx src/components/flowerPreservation/InvoiceStep.test.tsx --watchAll=false`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/flowerPreservation/ReviewStep.tsx src/components/flowerPreservation/InvoiceStep.tsx src/components/flowerPreservation/ReviewStep.test.tsx src/components/flowerPreservation/InvoiceStep.test.tsx
git commit -m "feat: add review and invoice download/share steps"
```

---

### Task 6: Wizard state machine and page wiring

**Files:**
- Create: `src/components/flowerPreservation/SendYourFlowersWizard.tsx`
- Modify: `src/pages/SendYourFlowersPage.tsx`
- Test: `src/components/flowerPreservation/SendYourFlowersWizard.test.tsx`

**Interfaces:**
- Consumes: `DetailsStep`, `KeepsakeStep`, `ConsentModal`, `ReviewStep`, `InvoiceStep` (default exports from Tasks 4–5); `buildInvoiceData`, `buildInvoicePdfBlob`, `loadLogoDataUrl` from `../../utils/invoiceGenerator`; `calculateReturnFee`, `calculateTotal` from the same module; `CustomerDetails`, `KeepsakeOption`, `ConsentChoice`, `WizardStep` from `./types`.
- Produces: `SendYourFlowersWizard` default export (no props — fully self-contained), used directly by `SendYourFlowersPage.tsx`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/flowerPreservation/SendYourFlowersWizard.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SendYourFlowersWizard from './SendYourFlowersWizard';
import * as invoiceGenerator from '../../utils/invoiceGenerator';

// IMPORTANT: this project's jest config sets resetMocks: true, which wipes
// any jest.fn()/jest.spyOn() implementation configured outside a beforeEach
// before every test runs (confirmed by spike — a module-scope spyOn silently
// reverts to a no-op returning undefined). These spies MUST be (re)configured
// inside beforeEach, not at module scope, or the wizard will hang waiting on
// a resolved promise that never comes.
beforeEach(() => {
  jest.spyOn(invoiceGenerator, 'loadLogoDataUrl').mockResolvedValue('data:image/png;base64,AAAA');
  jest.spyOn(invoiceGenerator, 'buildInvoicePdfBlob').mockReturnValue(new Blob(['%PDF-1.4'], { type: 'application/pdf' }));
});

test('walks through all five steps to a generated invoice', async () => {
  render(<SendYourFlowersWizard />);

  await userEvent.type(screen.getByLabelText(/full name/i), 'Jane Doe');
  await userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');
  await userEvent.click(screen.getByRole('button', { name: /continue/i }));

  await userEvent.click(screen.getByText('Coaster'));

  expect(screen.getByText(/flower drying consent/i)).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: /dazzling luxe may keep unused flowers/i }));

  expect(screen.getByText(/review your order/i)).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: /generate invoice/i }));

  expect(await screen.findByText(/your invoice is ready/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /download invoice/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `CI=true npx react-scripts test src/components/flowerPreservation/SendYourFlowersWizard.test.tsx --watchAll=false`
Expected: FAIL — `Cannot find module './SendYourFlowersWizard'`

- [ ] **Step 3: Implement `SendYourFlowersWizard.tsx`**

```tsx
// src/components/flowerPreservation/SendYourFlowersWizard.tsx
import { useState } from 'react';
import DetailsStep from './DetailsStep';
import KeepsakeStep from './KeepsakeStep';
import ConsentModal from './ConsentModal';
import ReviewStep from './ReviewStep';
import InvoiceStep from './InvoiceStep';
import { ConsentChoice, CustomerDetails, InvoiceData, KeepsakeOption, WizardStep } from './types';
import { buildInvoiceData, buildInvoicePdfBlob, calculateReturnFee, calculateTotal, loadLogoDataUrl } from '../../utils/invoiceGenerator';

const EMPTY_DETAILS: CustomerDetails = { name: '', email: '', phone: '', flowerType: '', message: '' };

const SendYourFlowersWizard = () => {
  const [step, setStep] = useState<WizardStep>('details');
  const [details, setDetails] = useState<CustomerDetails>(EMPTY_DETAILS);
  const [keepsake, setKeepsake] = useState<KeepsakeOption | null>(null);
  const [consentChoice, setConsentChoice] = useState<ConsentChoice | null>(null);
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateInvoice = async () => {
    if (!keepsake || !consentChoice) {
      return;
    }
    setGenerating(true);
    setError(null);
    try {
      const [invoiceData, logoDataUrl] = await Promise.all([
        buildInvoiceData({ customer: details, keepsake, consentChoice, issuedAt: new Date() }),
        loadLogoDataUrl(),
      ]);
      const blob = buildInvoicePdfBlob(invoiceData, logoDataUrl);
      setInvoice(invoiceData);
      setPdfBlob(blob);
      setStep('invoice');
    } catch {
      setError('Could not generate the invoice. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleStartOver = () => {
    setStep('details');
    setDetails(EMPTY_DETAILS);
    setKeepsake(null);
    setConsentChoice(null);
    setInvoice(null);
    setPdfBlob(null);
    setError(null);
  };

  if (step === 'details') {
    return (
      <DetailsStep
        details={details}
        onSubmit={(submitted) => {
          setDetails(submitted);
          setStep('keepsake');
        }}
      />
    );
  }

  if (step === 'keepsake') {
    return (
      <KeepsakeStep
        selected={keepsake}
        onSelect={(option) => {
          setKeepsake(option);
          setStep('consent');
        }}
        onBack={() => setStep('details')}
      />
    );
  }

  if (step === 'consent' && keepsake) {
    return (
      <ConsentModal
        keepsake={keepsake}
        onChoose={(choice) => {
          setConsentChoice(choice);
          setStep('review');
        }}
        onBack={() => setStep('keepsake')}
      />
    );
  }

  if (step === 'review' && keepsake && consentChoice) {
    const returnFee = calculateReturnFee(consentChoice);
    return (
      <ReviewStep
        details={details}
        keepsake={keepsake}
        consentChoice={consentChoice}
        returnFee={returnFee}
        total={calculateTotal(keepsake.price, returnFee)}
        onConfirm={handleGenerateInvoice}
        onBack={() => setStep('consent')}
        generating={generating}
        error={error}
      />
    );
  }

  if (step === 'invoice' && invoice && pdfBlob) {
    return <InvoiceStep invoice={invoice} pdfBlob={pdfBlob} onStartOver={handleStartOver} />;
  }

  return null;
};

export default SendYourFlowersWizard;
```

- [ ] **Step 4: Replace the page body in `SendYourFlowersPage.tsx`**

```tsx
// src/pages/SendYourFlowersPage.tsx
import SendYourFlowersWizard from '../components/flowerPreservation/SendYourFlowersWizard';

const SendYourFlowersPage = () => <SendYourFlowersWizard />;

export default SendYourFlowersPage;
```

- [ ] **Step 5: Run the new test to verify it passes**

Run: `CI=true npx react-scripts test src/components/flowerPreservation/SendYourFlowersWizard.test.tsx --watchAll=false`
Expected: PASS

- [ ] **Step 6: Run the full test suite**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: PASS — every test in `src/`, including `App.test.tsx` and all `flowerPreservation`/`invoiceGenerator` tests.

- [ ] **Step 7: Type-check the whole project**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add src/components/flowerPreservation/SendYourFlowersWizard.tsx src/components/flowerPreservation/SendYourFlowersWizard.test.tsx src/pages/SendYourFlowersPage.tsx
git commit -m "feat: wire up the flower preservation wizard on send-your-flowers page"
```

---

### Task 7: Manual verification in the browser

**Files:** none (manual QA task, no code changes)

- [ ] **Step 1: Start the dev server**

Run: `npm start`

- [ ] **Step 2: Walk the full flow in the browser**

Navigate to `http://localhost:3000/send-your-flowers` (or click "Send Your Flowers" from the header/footer/home page) and:
1. Submit the details form with a name and email.
2. Select "Shadow Box" as the keepsake.
3. In the consent modal, read the consent text, then choose "Return my unused flowers".
4. On the review screen, confirm the total shows $70.00 (shadow box) + the placeholder return fee, and click "Generate Invoice".
5. On the invoice screen, confirm the summary shows the correct invoice number, keepsake, total, and verification code.
6. Click "Download Invoice" and open the downloaded PDF — confirm it shows the Dazzling Luxe logo, brand colors, the line items, the consent clause, and the verification code.
7. Click "Share Invoice" — on a desktop browser without Web Share support this should silently do nothing (buttons below still work); on a supported mobile browser it should open the OS share sheet.
8. Click the Instagram/Facebook/TikTok buttons and confirm they open the placeholder URLs in a new tab.
9. Click "Start a new request" and confirm the wizard resets to Step 1.

- [ ] **Step 3: Repeat once choosing "Dazzling Luxe may keep unused flowers"** and confirm no return fee appears anywhere (review screen, invoice PDF, or on-screen summary).

- [ ] **Step 4: Report results**

If any step fails or looks wrong, fix the relevant component and re-run the full automated test suite (`CI=true npx react-scripts test --watchAll=false`) before re-verifying manually.

---

## Post-implementation notes for the business owner

- `RETURN_FEE_PLACEHOLDER` in `src/components/flowerPreservation/config.ts` is a placeholder — update it to the real fee before launch.
- `SOCIAL_LINKS` in the same file are placeholder URLs — update to the real Instagram/Facebook/TikTok profile links before launch.
- The PDF's verification code is a tampering deterrent, not cryptographic proof (no backend exists to independently verify it) — see the spec's Security section for the accepted tradeoff.
