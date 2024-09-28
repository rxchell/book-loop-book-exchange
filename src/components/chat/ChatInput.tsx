import * as React from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import { Stack } from '@mui/joy';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

export type ChatInputProps = {
  textAreaValue: string;
  setTextAreaValue: (value: string) => void;
  onSubmit: () => void;
};

export default function MessageInput(props: ChatInputProps) {
  const { textAreaValue, setTextAreaValue, onSubmit } = props;
  const textAreaRef = React.useRef<HTMLDivElement>(null);
  const handleClick = () => {
    if (textAreaValue.trim() !== '') {
      onSubmit();
      setTextAreaValue('');
    }
  };
  return (
    <Box sx={{ px: 2, pb: 3 }}>
      <FormControl>
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Textarea
            placeholder="Type your message here"
            aria-label="Message"
            ref={textAreaRef}
            onChange={(e) => {
              setTextAreaValue(e.target.value);
            }}
            value={textAreaValue}
            minRows={1}
            maxRows={8}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
                handleClick();
              }
            }}
            sx={{
              flexGrow: 1,
              '& textarea:first-of-type': {
                minHeight: 20,
              },
            }}
          />
          <IconButton
            aria-label="send message"
            size="sm"
            color="primary"
            sx={{
              borderRadius: 'sm',
              position: 'absolute',
              right: 10,
            }}
            onClick={handleClick}
          >
            <SendRoundedIcon />
          </IconButton>
        </Box>
      </FormControl>
    </Box>
  );
}
