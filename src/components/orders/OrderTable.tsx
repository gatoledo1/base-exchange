import { Box, Button, Card, CardContent, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid,  List, ListItem, ListItemText, Typography } from '@mui/material';
import { Order } from '../../types/order';

interface Props {
  openDetailsModal: boolean, 
  setOpenDetailsModal: React.Dispatch<React.SetStateAction<boolean>>, 
  selectedOrder: Order | null
}

export const OrderTable: React.FC<Props> = ({ openDetailsModal, setOpenDetailsModal, selectedOrder }) => {

  return (
    <Dialog open={openDetailsModal} onClose={() => setOpenDetailsModal(false)} maxWidth="md" fullWidth>
            <DialogTitle>Detalhes da Ordem #{selectedOrder?.id}</DialogTitle>
            <DialogContent>
              {selectedOrder && (
                <Box>
                  <Grid container spacing={3}>
                    {/* @ts-ignore */}
                    <Grid item xs={12} md={6}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>Informações Gerais</Typography>
                          <Typography><strong>Instrumento:</strong> {selectedOrder.instrument}</Typography>
                          <Typography><strong>Lado:</strong> {selectedOrder.side}</Typography>
                          <Typography><strong>Preço:</strong> R$ {selectedOrder.price.toFixed(2)}</Typography>
                          <Typography><strong>Quantidade:</strong> {selectedOrder.quantity}</Typography>
                          <Typography><strong>Qtd. Restante:</strong> {selectedOrder.remainingQuantity}</Typography>
                          <Typography><strong>Status:</strong> {selectedOrder.status}</Typography>
                          <Typography><strong>Criada em:</strong> {selectedOrder.createdAt.toLocaleString('pt-BR')}</Typography>
                          <Typography><strong>Atualizada em:</strong> {selectedOrder.updatedAt.toLocaleString('pt-BR')}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item xs={12} md={6}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>Histórico de Alterações</Typography>
                          <List>
                            {selectedOrder.history.map((entry, index) => (
                              <ListItem key={entry.id} divider={index < selectedOrder.history.length - 1}>
                                <ListItemText
                                  primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <Chip label={entry.status} size="small" />
                                      <Typography variant="body2">
                                        {entry.timestamp.toLocaleString('pt-BR')}
                                      </Typography>
                                    </Box>
                                  }
                                  secondary={entry.description}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDetailsModal(false)}>Fechar</Button>
            </DialogActions>
          </Dialog>
  );
};