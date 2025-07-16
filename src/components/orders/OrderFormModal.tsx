import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  InputAdornment,
} from '@mui/material';
import { instruments } from '../../mockDatas/order';
import { CreateOrderForm, Order } from '../../types/order';
import { executeOrders } from '../../utils/executeOrders';

interface Props {
  openCreateModal: boolean;
  setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateForm: React.Dispatch<React.SetStateAction<CreateOrderForm>>;
  createForm: CreateOrderForm;
  setSnackbar: React.Dispatch<React.SetStateAction<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export const OrderFormModal: React.FC<Props> = ({ 
  openCreateModal, setOpenCreateModal, setCreateForm, createForm, setSnackbar, orders, setOrders
}) => {
  const handleCreateOrder = () => {
    if (!createForm.instrument || !createForm.price || !createForm.quantity) {
      setSnackbar({ open: true, message: 'Preencha todos os campos obrigatórios', severity: 'error' });
      return;
    }

    const newOrder: Order = {
      id: (orders.length + 1).toString(),
      instrument: createForm.instrument,
      side: createForm.side,
      price: createForm.price,
      quantity: createForm.quantity,
      remainingQuantity: createForm.quantity,
      status: 'ABERTO',
      createdAt: new Date(),
      updatedAt: new Date(),
      history: []
    };

    executeOrders(newOrder, orders, setOrders);
    setOpenCreateModal(false);
    setCreateForm({ instrument: '', side: 'COMPRA', price: 0, quantity: 0 });
    setSnackbar({ open: true, message: 'Ordem criada com sucesso!', severity: 'success' });
  }
  return (
    <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Nova Ordem</DialogTitle>
            <DialogContent>
              <Box sx={{ pt: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={{minWidth: 160}}>
                      <InputLabel>Instrumento</InputLabel>
                      <Select
                        value={createForm.instrument}
                        label="Instrumento"
                        onChange={(e) => setCreateForm({ ...createForm, instrument: e.target.value })}
                      >
                        {instruments.map(instrument => (
                          <MenuItem key={instrument} value={instrument}>{instrument}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={{minWidth: 130}}>
                      <InputLabel>Lado</InputLabel>
                      <Select
                        value={createForm.side}
                        label="Lado"
                        onChange={(e) => setCreateForm({ ...createForm, side: e.target.value as 'COMPRA' | 'VENDA' })}
                      >
                        <MenuItem value="COMPRA">Compra</MenuItem>
                        <MenuItem value="VENDA">Venda</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Preço"
                      type="number"
                      value={createForm.price}
                      onChange={(e) => setCreateForm({ ...createForm, price: Number(e.target.value) })}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Quantidade"
                      type="number"
                      value={createForm.quantity}
                      onChange={(e) => setCreateForm({ ...createForm, quantity: Number(e.target.value) })}
                    />
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenCreateModal(false)}>Cancelar</Button>
              <Button onClick={handleCreateOrder} variant="contained">Criar Ordem</Button>
            </DialogActions>
          </Dialog>
  );
};