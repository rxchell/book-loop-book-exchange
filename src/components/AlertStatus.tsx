import * as React from 'react';
import Alert from '@mui/joy/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

export interface SignInAlertProps {
  success: boolean;
  message: string; // Add message prop
}

const AlertStatus: React.FC<SignInAlertProps> = ({ success, message }) => {
  return (
    <Alert
      startDecorator={success ? <CheckIcon data-testid="check-icon" fontSize="inherit" /> : <ErrorIcon data-testid="error-icon" fontSize="inherit" />}
      color={success ? 'success' : 'danger'}
    >
      {message} {/* Display custom message */}
    </Alert>
  );
}

export default AlertStatus;
