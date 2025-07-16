import { Order } from "../types/order";

export const executeOrders = (newOrder: Order, orders: Order[], setOrders: React.Dispatch<React.SetStateAction<Order[]>>) => {
    const compatibleOrders = orders.filter(order => 
      order.instrument === newOrder.instrument &&
      order.side !== newOrder.side &&
      order.status !== 'CANCELADO' &&
      order.status !== 'EXECUTADO' &&
      ((newOrder.side === 'COMPRA' && order.price <= newOrder.price) ||
       (newOrder.side === 'VENDA' && order.price >= newOrder.price))
    ).sort((a, b) => newOrder.side === 'COMPRA' ? a.price - b.price : b.price - a.price);

    let remainingQuantity = newOrder.quantity;
    const updatedOrders = [...orders];
    
    for (const compatibleOrder of compatibleOrders) {
      if (remainingQuantity <= 0) break;
      
      const orderIndex = updatedOrders.findIndex(o => o.id === compatibleOrder.id);
      if (orderIndex === -1) continue;
      
      const executedQuantity = Math.min(remainingQuantity, compatibleOrder.remainingQuantity);
      remainingQuantity -= executedQuantity;
      
      updatedOrders[orderIndex] = {
        ...compatibleOrder,
        remainingQuantity: compatibleOrder.remainingQuantity - executedQuantity,
        status: compatibleOrder.remainingQuantity - executedQuantity === 0 ? 'EXECUTADO' : 'PARCIAL',
        updatedAt: new Date(),
        history: [
          ...compatibleOrder.history,
          {
            id: Date.now().toString(),
            status: compatibleOrder.remainingQuantity - executedQuantity === 0 ? 'EXECUTADO' : 'PARCIAL',
            timestamp: new Date(),
            description: `Execução de ${executedQuantity} ações a R$ ${compatibleOrder.price}`
          }
        ]
      };
    }

    const finalOrder: Order = {
      ...newOrder,
      remainingQuantity,
      status: remainingQuantity === 0 ? 'EXECUTADO' : remainingQuantity < newOrder.quantity ? 'PARCIAL' : 'ABERTO',
      history: [
        {
          id: '1',
          status: 'ABERTO',
          timestamp: new Date(),
          description: 'Ordem criada'
        },
        ...(remainingQuantity < newOrder.quantity ? [{
          id: '2',
          status: remainingQuantity === 0 ? 'EXECUTADO' : 'PARCIAL',
          timestamp: new Date(),
          description: `Execução ${remainingQuantity === 0 ? 'total' : 'parcial'} de ${newOrder.quantity - remainingQuantity} ações`
        }] : [])
      ]
    };

    updatedOrders.push(finalOrder);
    setOrders(updatedOrders);
  }