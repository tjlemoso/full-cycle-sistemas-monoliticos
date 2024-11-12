export interface InputProcessPaymentFacadeDto {
  orderId: string;
  amount: number;
}

export interface OutputProcessPaymentFacadeDto {
  transactionId: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
