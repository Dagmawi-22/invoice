export interface Invoice {
  id: string;
  items: Item[];
  totalAmount: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface ItemForm {
  description: string;
  quantity: number;
  price: number;
}

export interface Item extends ItemForm {
  id: string;
  amount?: number;
  invoiceId?: string;
  createdAt?: string;
  updatedAt?: string;
}
