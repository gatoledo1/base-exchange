import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Alert, Snackbar, Grid } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Add, Clear } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DynamicForm from './components/DynamicForm';
import { filterInputsMetadata } from './formDatas/Filter';
import { mockOrders } from './mockDatas/order';
import { Order, CreateOrderForm  } from './types/order';
import { mockColumns } from './mockDatas/columns';
import { OrderTable } from './components/orders/OrderTable';
import { OrderFormModal } from './components/orders/OrderFormModal';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00d4ff',
    },
    secondary: {
      main: '#ff6b6b',
    },
    background: {
      default: '#0a0e27',
      Box: '#1a1d3a',
    },
    success: {
      main: '#00c853',
    },
    error: {
      main: '#ff1744',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #2a2d4a',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#1a1d3a',
            borderBottom: '2px solid #00d4ff',
          },
        },
      },
    },
  },
});

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [createForm, setCreateForm] = useState<CreateOrderForm>({
    instrument: '',
    side: 'COMPRA',
    price: 0,
    quantity: 0
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [filters, setFilters] = useState({
    id: '',
    instrument: '',
    side: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  });
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const arrayFormData = filterInputsMetadata(setFilters, filters)

  const PropsModalCreateOrder = {
    openCreateModal, 
    setOpenCreateModal, 
    setCreateForm, 
    createForm, 
    setSnackbar, 
    orders, 
    setOrders
  }

  useEffect(() => {
    const filtered = orders.filter(order => {
      if (filters.id && !order.id.includes(filters.id)) 
        return false
      if (filters.instrument && !order.instrument.includes(filters.instrument.toUpperCase())) 
        return false
      if (filters.side && order.side !== filters.side) 
        return false
      if (filters.status && order.status !== filters.status) 
        return false
      if (filters.dateFrom && new Date(order.createdAt) < new Date(filters.dateFrom)) 
        return false
      if (filters.dateTo && new Date(order.createdAt) > new Date(filters.dateTo)) return false
      return true
    })
  
    setFilteredOrders(filtered)
  }, [filters, orders])

  

  const handleCancelOrder = () => {
    if (!selectedOrder) return;

    const updatedOrders = orders.map(order => {
      if (order.id === selectedOrder.id) {
        return {
          ...order,
          status: 'CANCELADO' as const,
          updatedAt: new Date(),
          history: [
            ...order.history,
            {
              id: Date.now().toString(),
              status: 'CANCELADO',
              timestamp: new Date(),
              description: 'Ordem cancelada pelo usuário'
            }
          ]
        };
      }
      return order;
    });

    setOrders(updatedOrders);
    setOpenCancelModal(false);
    setSelectedOrder(null);
    setSnackbar({ open: true, message: 'Ordem cancelada com sucesso!', severity: 'success' });
  };

  const columns = mockColumns(setSelectedOrder, setOpenDetailsModal, setOpenCancelModal)

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 3, px: {xs: 2, sm: 5} }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
              BASE Exchange - Gerenciamento de Ordens
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              Sistema de negociação de ativos financeiros
            </Typography>
          </Box>

          <Box sx={{mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
             Filtros
            </Typography>

            <Grid container spacing={2}>
              <DynamicForm dataFields={arrayFormData} props={undefined} />
              <Button
                variant="outlined"
                startIcon={<Clear />}
                onClick={() => setFilters({
                  id: '',
                  instrument: '',
                  side: '',
                  status: '',
                  dateFrom: '',
                  dateTo: ''
                })}
                size="large"
              >
                Limpar filtros
              </Button>
            </Grid>

          </Box>

          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenCreateModal(true)}
              size="large"
            >
              Nova Ordem
            </Button>
          </Box>

          <Box sx={{ maxHeight: 600, width: '100%' }}>
            <DataGrid
              rows={filteredOrders}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
              page={page}
              onPageChange={setPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
              components={{
                Toolbar: GridToolbar,
              }}
              disableSelectionOnClick
              sx={{
                width: '100%',
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: 'rgba(0, 212, 255, 0.1)',
                },
              }}
            />
          </Box>

          <OrderTable openDetailsModal={openDetailsModal} setOpenDetailsModal={setOpenDetailsModal} selectedOrder={selectedOrder} />
          <OrderFormModal {...PropsModalCreateOrder} />

          <Dialog open={openCancelModal} onClose={() => setOpenCancelModal(false)}>
            <DialogTitle>Cancelar Ordem</DialogTitle>
            <DialogContent>
              <Typography>
                Tem certeza que deseja cancelar a ordem #{selectedOrder?.id}?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenCancelModal(false)}>Não</Button>
              <Button onClick={handleCancelOrder} variant="contained" color="error">
                Sim, Cancelar
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
              {snackbar.message}
            </Alert>
          </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default OrderManagement;