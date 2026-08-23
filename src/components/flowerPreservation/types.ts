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
