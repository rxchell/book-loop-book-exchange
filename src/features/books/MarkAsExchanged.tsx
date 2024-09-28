import React, { useState } from 'react';
import Button from '@mui/joy/Button';

const MarkAsExchanged: React.FC = () => {
  const [disabled, setDisabled] = useState(false);

  const handleClick = () => {
    setDisabled(true);
    // You can add any additional logic here if needed (like an API call).
  };

  return (
      <Button
        variant="soft"
        color="danger"
        sx={{ alignSelf: 'flex-end', marginTop: 2 }}
        disabled={disabled}
        onClick={handleClick}
      >
        {disabled ? 'Exchanged' : 'Mark as Exchanged'}
      </Button>
  );
};

export default MarkAsExchanged;
