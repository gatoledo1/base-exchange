interface Filters { 
    id: string; 
    instrument: string; 
    side: string; 
    status: string; 
    dateFrom: string; 
    dateTo: string; 
}

export const filterInputsMetadata = (
    setFilters: React.Dispatch<React.SetStateAction<Filters>>, 
    filters: Filters
) => {
    
    return [
        {
            type: 'inputTextOrNumber',
            xs: 12,
            sm: 6,
            md: 2,
            lg: 2,
            className: "",
            fullWidth: true,
            id: "id",
            name: "id",
            test: "campo_id",
            autoFocus: true,
            value: filters.id,
            label: "ID",
            size: "small",
            inputProps: {
              maxLength: 50,
              style: {maxWidth: 120}
            },
            onInput: undefined,
            onChange: (e: { target: { value: any; }; }) => {setFilters({ ...filters, id: e.target.value })},
        },
        {
            type: 'inputTextOrNumber',
            xs: 12,
            sm: 6,
            md: 2,
            lg: 2,
            className: "",
            fullWidth: true,
            id: "instrumento",
            name: "instrumento",
            autoFocus: true,
            value: filters.instrument,
            label: "Instrumento",
            test: "campo_instrumento",
            size: "small",
            inputProps: {
              maxLength: 50,
              style: {flex: 1}
            },
            onInput: undefined,
            onChange: (e: { target: { value: any; }; }) => {setFilters({ ...filters, instrument: e.target.value })},
        },
        {
            type: 'select',
            xs: 12,
            sm: 6,
            md: 2,
            lg: 2,
            fullWidth: true,
            id: 'lado',
            name: 'lado',
            className: '',
            test: "campo_lado",
            hideSelecione: true,
            options: [
              {value: '', label: 'TODOS'},
              {value: 'COMPRA', label: 'COMPRA'},
              {value: 'VENDA', label: 'VENDA'},
            ],
            value: filters.side,
            label: "Lado",
            size: 'small',
            onChange: (e: { target: { value: any; }; }) => setFilters({ ...filters, side: e.target.value }),
        },
        {
            type: 'select',
            xs: 12,
            sm: 6,
            md: 2,
            lg: 2,
            fullWidth: true,
            id: 'status',
            name: 'status',
            test: "campo_status",
            className: '',
            hideSelecione: true,
            options: [
              {value: '', label: 'TODOS'},
              {value: 'ABERTO', label: 'ABERTO'},
              {value: 'PARCIAL', label: 'PARCIAL'},
              {value: 'EXECUTADO', label: 'EXECUTADO'},
              {value: 'CANCELADO', label: 'CANCELADO'},
            ],
            value: filters.status,
            label: "Status",
            size: 'small',
            onChange: (e: { target: { value: any; }; }) => setFilters({ ...filters, status: e.target.value }),
        },
        {
            type: 'date',
            xs: 12,
            sm: 6,
            md: 2,
            lg: 2,
            className: "",
            fullWidth: true,
            id: "data_de",
            name: "data_de",
            test: "campo_data_de",
            autoFocus: true,
            value: filters.dateFrom,
            label: "Data De",
            size: "small",
            inputProps: {
              maxLength: 50
            },
            onInput: undefined,
            onChange: (e: { target: { value: any; }; }) => {setFilters({ ...filters, dateFrom: e.target.value })},
        },
        {
            type: 'date',
            xs: 12,
            sm: 6,
            md: 2,
            lg: 2,
            className: "",
            fullWidth: true,
            id: "data_ate",
            name: "data_ate",
            test: "campo_data_ate",
            autoFocus: true,
            value: filters.dateTo,
            label: "Data Até",
            size: "small",
            inputProps: {
              maxLength: 50,
            },
            onInput: undefined,
            onChange: (e: { target: { value: any; }; }) => {setFilters({ ...filters, dateTo: e.target.value })},
        },
    ]
}