import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import OrderManagement from '../Order';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({ palette: { mode: 'dark' } });

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('OrderManagement - Filtros e Interações', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('filtra por ID corretamente', async () => {
    renderWithTheme(<OrderManagement />);
    const inputId = screen.getByLabelText('ID');
    fireEvent.change(inputId, { target: { value: '2' } });

    const grid = await screen.findByRole('grid');
    const rows = within(grid).getAllByRole('row');

    expect(rows).toHaveLength(2); // header + 1 resultado
    expect(screen.getByText('VALE3')).toBeInTheDocument();
    expect(screen.queryByText('PETR4')).not.toBeInTheDocument();
  });

  it('filtra por instrumento', async () => {
    renderWithTheme(<OrderManagement />);
    const inputInstrument = screen.getByLabelText('Instrumento');
    fireEvent.change(inputInstrument, { target: { value: 'ITUB4' } });

    expect(screen.getByText('ITUB4')).toBeInTheDocument();
    expect(screen.queryByText('PETR4')).not.toBeInTheDocument();
  });

  it('filtra por lado COMPRA', async () => {
    renderWithTheme(<OrderManagement />);
    const select = screen.getByLabelText('Lado');
    fireEvent.change(select, { target: { value: 'COMPRA' } });

    expect(await screen.findByText('PETR4')).toBeInTheDocument();
    expect(screen.queryByText('VALE3')).not.toBeInTheDocument(); // VENDA
  });

  it('filtra por status EXECUTADO', async () => {
    renderWithTheme(<OrderManagement />);
    const select = screen.getByLabelText('Status');
    fireEvent.change(select, { target: { value: 'EXECUTADO' } });

    expect(await screen.findByText('ITUB4')).toBeInTheDocument();
    expect(screen.queryByText('PETR4')).not.toBeInTheDocument();
  });

  it('filtra por data "Data De"', async () => {
    renderWithTheme(<OrderManagement />);
    const dateFrom = screen.getByLabelText('Data De');
    fireEvent.change(dateFrom, { target: { value: '2025-01-15' } });

    const grid = await screen.findByRole('grid');
    const rows = within(grid).getAllByRole('row');

    expect(rows.length).toBeGreaterThanOrEqual(2);
    expect(screen.queryByText('ITUB4')).not.toBeInTheDocument(); // era 08:45
  });

  it('abre e fecha o modal de detalhes da ordem', async () => {
    renderWithTheme(<OrderManagement />);
    const visualizarButtons = await screen.findAllByRole('button', {
      name: /visualizar/i,
    });

    fireEvent.click(visualizarButtons[0]);
    expect(screen.getByText(/Detalhes da Ordem/i)).toBeInTheDocument();

    const fecharBtn = screen.getByRole('button', { name: /fechar/i });
    fireEvent.click(fecharBtn);

    expect(screen.queryByText(/Detalhes da Ordem/i)).not.toBeInTheDocument();
  });

  it('abre e fecha o modal de cancelamento', async () => {
    renderWithTheme(<OrderManagement />);
    const cancelarBtns = await screen.findAllByRole('button', {
      name: '',
    });

    const botaoCancelamento = cancelarBtns.find((btn) =>
      btn.innerHTML.includes('Cancel')
    );
    if (botaoCancelamento) {
      fireEvent.click(botaoCancelamento);
      expect(
        screen.getByText(/Tem certeza que deseja cancelar/i)
      ).toBeInTheDocument();

      fireEvent.click(screen.getByText('Não'));
      expect(screen.queryByText(/Tem certeza que deseja cancelar/i)).not.toBeInTheDocument();
    }
  });
});