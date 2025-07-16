export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum OrderStatus {
  OPEN = 'OPEN',
  PARTIAL = 'PARTIAL',
  EXECUTED = 'EXECUTED',
  CANCELLED = 'CANCELLED',
}

export interface Order {
  id: string;
  instrument: string;
  side: 'COMPRA' | 'VENDA';
  price: number;
  quantity: number;
  remainingQuantity: number;
  status: 'ABERTO' | 'PARCIAL' | 'EXECUTADO' | 'CANCELADO';
  createdAt: Date;
  updatedAt: Date;
  history: OrderHistory[];
}

interface OrderHistory {
  id: string;
  status: string;
  timestamp: Date;
  description: string;
}

export interface CreateOrderForm {
  instrument: string;
  side: 'COMPRA' | 'VENDA';
  price: number;
  quantity: number;
}