export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  items: { description: string; amount: number }[];
  totalAmount: number;
  dueDate: string | Date;
}
