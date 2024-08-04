export interface Invoice {
  id: string;
  items: Item[];
  totalAmount: number;
  dueDate: string;
}

export interface Item {
  description: string;
  amount: number;
  id: string;
  invoiceId: string;
  createdAt: string;
  updatedAt: string | null;
}
