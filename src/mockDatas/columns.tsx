import { Box, Chip, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Order } from "../types/order";
import { Cancel, Visibility } from "@mui/icons-material";
import { SetStateAction } from "react";

export const mockColumns = (
    setSelectedOrder: { (value: SetStateAction<Order | null>): void; (arg0: SetStateAction<Order | null>): void; }, 
    setOpenDetailsModal: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }, 
    setOpenCancelModal: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }
): GridColDef[] => (
    [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'instrument', headerName: 'Instrumento', width: 120 },
        {
            field: 'side',
            headerName: 'Lado',
            width: 130,
            renderCell: (params: { value: string; }) => (
                <Chip
                label={params.value}
                color={params.value === 'COMPRA' ? 'success' : 'error'}
                size="small"
                />
            )
        },
        {
            field: 'price',
            headerName: 'Preço',
            width: 100,
            renderCell: (params: { value: number; }) => `R$ ${params.value.toFixed(2)}`
        },
        { field: 'quantity', headerName: 'Quantidade', width: 100 },
        { field: 'remainingQuantity', headerName: 'Qtd. Restante', width: 120 },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params: { value: string; }) => {
                const colors = {
                ABERTO: 'primary',
                PARCIAL: 'warning',
                EXECUTADO: 'success',
                CANCELADO: 'error'
                };
                return (
                <Chip
                    label={params.value}
                    color={colors[params.value as keyof typeof colors] as any}
                    size="small"
                />
                );
            }
        },
        {
            field: 'createdAt',
            headerName: 'Data/Hora',
            width: 180,
            renderCell: (params: { value: string | number | Date; }) => new Date(params.value).toLocaleString('pt-BR')
        },
        {
            field: 'actions',
            headerName: 'Ações',
            width: 150,
            renderCell: (params: { row: React.SetStateAction<Order | null>; }) => (
                <Box>
                <IconButton
                    size="small"
                    onClick={() => {
                    setSelectedOrder(params.row);
                    setOpenDetailsModal(true);
                    }}
                >
                    <Visibility />
                </IconButton>
                {(params.row.status === 'ABERTO' || params.row.status === 'PARCIAL') && (
                    <IconButton
                    size="small"
                    color="error"
                    onClick={() => {
                        setSelectedOrder(params.row);
                        setOpenCancelModal(true);
                    }}
                    >
                    <Cancel />
                    </IconButton>
                )}
                </Box>
            )
        }
    ]
);