import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import FormControl, { FormControlProps } from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';

export default function Interest(props: FormControlProps) {
  const { sx, ...other } = props;
  return (
    <FormControl
      {...other}
      sx={[{ display: { sm: 'contents' } }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <FormLabel>Interests</FormLabel>
      <Autocomplete
        multiple  // Allow multiple selections
        size="sm"
        autoHighlight
        defaultValue={[]} // Set default value as an empty array for multiple selections
        options={hobbies}
        renderOption={(optionProps, option) => (
          <AutocompleteOption {...optionProps}>
            {option.label}
          </AutocompleteOption>
        )}
        slotProps={{
          input: {
            autoComplete: 'new-password', // disable autocomplete and autofill
          },
        }}
      />
    </FormControl>
  );
}

interface HobbyType {
  label: string;
  suggested?: boolean;
}
const hobbies: readonly HobbyType[] = [
  { label: "coding" }, 
  { label: "cooking" }, 
  { label: "dancing" }, 
  { label: "drawing" }, 
  { label: "eating" }, 
  { label: "exercising" }, 
  { label: "fishing" }, 
  { label: "gardening" }, 
  { label: "hiking" }, 
  { label: "jogging" }, 
  { label: "painting" }, 
  { label: "reading" }, 
  { label: "running" }, 
  { label: "singing" }, 
  { label: "swimming" }, 
  { label: "traveling" }, 
  { label: "walking" }, 
  { label: "writing" }
];
