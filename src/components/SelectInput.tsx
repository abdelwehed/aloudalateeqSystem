import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectInput(props: any) {
  const [cardType, setCardType] = React.useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setCardType(value);
    props.onSelect(value);
  };

  return (
    <FormControl sx={{ minWidth: '100%' }}>
      <InputLabel id="demo-select-small">{props.inputLabel}</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={cardType}
        label="CardType"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {props.data.map((el: any, id: number) => (
          <MenuItem key={id} value={el.value}>
            {el.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
