import React from 'react';
import {
  Grid,
  Autocomplete,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';


const DynamicForm = ({ props, dataFields }) => {

  const renderFormField = (field: any) => {
    switch (field.type) {
      case 'autocomplete':
        return (
          <>
          {/* @ts-ignore */}
            <Grid item xs={field.xs} sm={field.sm} md={field.md} lg={field.lg} className={field.className}>
                <Autocomplete 
                id={field.id}
                options={field.options || []}
                getOptionLabel={field.getOptionLabel}
                isOptionEqualToValue={field.isOptionEqualToValue}
                filterOptions={(x) => x}
                onChange={field.onChange}
                onInputChange={field.onInputChange}
                noOptionsText={field.noOptionsText}
                value={field.value}
                includeInputInList
                filterSelectedOptions
                size={field.size}
                data-testid={field.test}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    {...(field.mobileBlockTyping && { className: 'hidden-textfield' })}
                    name={field.TextField.name}
                    autoComplete="no-autofill"
                    label={field.TextField.label}
                    size={field.TextField.size}
                    autoFocus={field.TextField.autoFocus}
                    SelectProps={field.TextField.SelectProps}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'no-autofill',
                    }}
                    InputProps={{
                        ...params.InputProps,
                        ...field.inputProps
                    }}
                    {...(field.error && { error: field.error })}
                    {...(field.helperText && { helperText: field.helperText })}
                    />
                )}
                renderOption={field.renderOption}
                {...props}
                />
            </Grid>
          </>
        );

      case 'inputTextOrNumber':
        return (
          <>
          {/* @ts-ignore */}
            <Grid item xs={field.xs} sm={field.sm} md={field.md} lg={field.lg} className={field.className}>
                <TextField
                className={field.className}
                fullWidth={field.fullWidth}
                onInput={field.onInput}
                autoFocus={field.autoFocus}
                id={field.id}
                autoComplete="no-autofill"
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                inputRef={field.inputRef}
                onBlur={field.onBlur}
                label={field.label}
                size={field.size}
                disabled={field.disabled}
                data-testid={field.test}
                inputProps={{ 
                    ...field.inputProps,
                    autoComplete: 'no-autofill',
                }}
                error={field.error}
                helperText={field.helperText}
                {...props}
                />
            </Grid>
          </>
        );

    case 'date':
        return (
          <>
          {/* @ts-ignore */}
            <Grid item xs={field.xs} sm={field.sm} md={field.md} lg={field.lg} className={field.className}>
                <TextField
                    data-testid={field.test}
                    fullWidth
                    type="date"
                    value={field.value || ''}
                    label={field.label}
                    onChange={field.onChange}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    sx={{minWidth: 180}}
                />  
            </Grid>
          </>
        )

      case 'select':
        return (
          <>
          {/* @ts-ignore */}
            <Grid item xs={field.xs} sm={field.sm} md={field.md} lg={field.lg} className={field.className}>
                <FormControl sx={{ m: 1, minWidth: 150, width: "100%" }} error={field.error ? true : false}>
                <InputLabel id={`select-label-${field.name}`}>{field.label}</InputLabel>
                <Select sx={{ m: 1, width: "100%" }}
                    labelId={`select-label-${field.name}`}
                    value={field.value || ''}
                    label={field.label}
                    onChange={field.onChange}
                    size="small"
                    name={field.name}
                    disabled={field.disabled}
                    data-testid={field.test}
                    inputProps={{
                        style: {width: 135}
                    }}
                >
                    {
                        field.options?.length > 0 && 
                        //Se eu colocar todos os tipos, ficará muito extenso
                        field.options.map((item: any, index: React.Key) => (
                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))
                    }
                </Select>
                </FormControl>  
                {field.error && (
                <Typography className='color-error'>{field.helperText}</Typography>
                )}          
            </Grid>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Grid container spacing={2} className='dynamic-form'>
      {dataFields?.map((field: { name: string; label: string; }, index: React.Key) => (
        <React.Fragment key={(field.name + index) || (field.label + index) || index}>
          {renderFormField(field)}
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default DynamicForm;