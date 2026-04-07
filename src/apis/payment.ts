import { PaymentMethod, PaymentStatus } from "./orderApi";

export interface Payment {
    id?: number;
  
    orderId: number;
  
    method: PaymentMethod;
    status: PaymentStatus;
  
    transactionId?: string;
  
    amount: number;
  
    paidAt?: string;
  }