import { Order } from "../types/order";

export const mockOrders: Order[] = [
  {
    id: '1',
    instrument: 'PETR4',
    side: 'COMPRA',
    price: 32.50,
    quantity: 100,
    remainingQuantity: 100,
    status: 'ABERTO',
    createdAt: new Date('2025-01-15T10:30:00'),
    updatedAt: new Date('2025-01-15T10:30:00'),
    history: [
      { id: '1', status: 'ABERTO', timestamp: new Date('2025-01-15T10:30:00'), description: 'Ordem criada' }
    ]
  },
  {
    id: '2',
    instrument: 'VALE3',
    side: 'VENDA',
    price: 68.75,
    quantity: 50,
    remainingQuantity: 25,
    status: 'PARCIAL',
    createdAt: new Date('2025-01-15T09:15:00'),
    updatedAt: new Date('2025-01-15T11:20:00'),
    history: [
      { id: '1', status: 'ABERTO', timestamp: new Date('2025-01-15T09:15:00'), description: 'Ordem criada' },
      { id: '2', status: 'PARCIAL', timestamp: new Date('2025-01-15T11:20:00'), description: 'Execução parcial de 25 ações' }
    ]
  },
  {
    id: '3',
    instrument: 'ITUB4',
    side: 'COMPRA',
    price: 25.80,
    quantity: 200,
    remainingQuantity: 0,
    status: 'EXECUTADO',
    createdAt: new Date('2025-01-15T08:45:00'),
    updatedAt: new Date('2025-01-15T08:47:00'),
    history: [
      { id: '1', status: 'ABERTO', timestamp: new Date('2025-01-15T08:45:00'), description: 'Ordem criada' },
      { id: '2', status: 'EXECUTADO', timestamp: new Date('2025-01-15T08:47:00'), description: 'Ordem executada totalmente' }
    ]
  }
];

export const instruments = ['PETR4', 'VALE3', 'ITUB4', 'BBDC4', 'ABEV3', 'WEGE3', 'MGLU3'];