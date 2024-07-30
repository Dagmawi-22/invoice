export interface Invoice {
  invoiceNumber: string;
  clientName: string;
  items: { description: string; amount: number }[];
  totalAmount: number;
  dueDate: string;
}
