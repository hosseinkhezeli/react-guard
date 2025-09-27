import { ReactNode, ReactElement } from 'react';
import { ErrorInfo } from 'react';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

export interface AlertProps {
  type?: AlertType;
  message: ReactNode;
  description?: ReactNode;
  closable?: boolean;
  closeIcon?: ReactNode;
  showIcon?: boolean;
  icon?: ReactNode;
  banner?: boolean;
  onClose?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  action?: ReactNode;
}

export type ErrorState = { error: Error; info: ErrorInfo } | null;

export interface GuardProps {
  name?: string;
  children: ReactElement;
  /** Optional custom fallback UI */
  Fallback?: (info: { error: Error; info: ErrorInfo }) => ReactElement;
  /** Optional callback on error */
  onError?: (error: Error, info: ErrorInfo) => void;
  /** Optional custom message to display instead of error.message */
  message?: string;
  alertType?: AlertType;
}
