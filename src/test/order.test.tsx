import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import OrderManagement from '../Order';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({ palette: { mode: 'dark' } });

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('OrderManagement', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('renderiza o título principal corretamente', () => {
    renderWithTheme(<OrderManagement />);
    expect(screen.getByText(/BASE Exchange - Gerenciamento de Ordens/i)).toBeInTheDocument();
  });

  it('exibe as ordens mockadas na tabela', async () => {
    renderWithTheme(<OrderManagement />);
    expect(await screen.findByText('PETR4')).toBeInTheDocument();
    expect(await screen.findByText('VALE3')).toBeInTheDocument();
    expect(await screen.findByText('ITUB4')).toBeInTheDocument();
  });

  it('abre o modal de nova ordem ao clicar no botão "Nova Ordem"', () => {
    renderWithTheme(<OrderManagement />);
    const botao = screen.getByRole('button', { name: /nova ordem/i });
    fireEvent.click(botao);
    expect(screen.getByText(/Nova Ordem/i)).toBeInTheDocument();
  });

  it('filtra ordens pelo ID digitado', async () => {
    renderWithTheme(<OrderManagement />);
    const inputId = screen.getByLabelText('ID');
    fireEvent.change(inputId, { target: { value: '2' } });

    const grid = await screen.findByRole('grid');
    const rows = within(grid).getAllByRole('row');
    // Um header + 1 linha de resultado esperada
    expect(rows.length).toBe(2);
    expect(screen.queryByText('VALE3')).toBeInTheDocument();
  });
});


