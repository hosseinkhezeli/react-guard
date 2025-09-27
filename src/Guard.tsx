import { Component, ErrorInfo, ReactNode, useState } from 'react';
import type { GuardProps, ErrorState } from './types';
import { Alert } from './components/Alert';

class ErrorBoundary extends Component<{
  children: ReactNode;
  onCatch: (error: Error, info: ErrorInfo) => void;
}> {
  state = { hasError: false };

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ hasError: true });
    this.props.onCatch(error, info);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

/**
 * Guard is a React error boundary component that wraps its children and
 * catches JavaScript errors in the component tree.
 *
 * Features:
 * - Displays a default alert when an error occurs.
 * - Supports optional custom fallback UI via `Fallback` prop.
 * - Optional `onError` callback to log or handle errors programmatically.
 * - Multi-lingual friendly default messages (English/Farsi).
 * - Minimal dependencies, fully self-contained.
 *
 * Usage:
 * ```tsx
 * <Guard message="Something went wrong" alertType="error">
 *   <MyComponent />
 * </Guard>
 * ```
 *
 * Props:
 * @param children - The React element(s) to wrap.
 * @param Fallback - Optional custom fallback UI as a function receiving { error, info }.
 * @param onError - Optional callback executed when an error is caught.
 * @param name - Optional component name used in default error message.
 * @param message - Optional custom message to display instead of the default error message.
 * @param alertType - Optional type of alert for the default message ('success' | 'info' | 'warning' | 'error').
 */
export function Guard({
  children,
  Fallback,
  onError,
  name,
  message,
  alertType = 'error',
}: GuardProps) {
  const [errorInfo, setErrorInfo] = useState<ErrorState>(null);

  const handleCatch = (error: Error, info: ErrorInfo) => {
    setErrorInfo({ error, info });
    if (onError) onError(error, info);
  };

  const defaultMessage = (() => {
    const lang = typeof navigator !== 'undefined' ? navigator.language : 'en';
    if (lang.startsWith('fa'))
      return name ? `خطای کامپوننت ${name}` : 'خطای کامپوننت';
    return name ? `${name} Component Error` : 'Component Error';
  })();

  const finalMessage = message ?? defaultMessage;

  if (errorInfo) {
    if (Fallback) return Fallback(errorInfo);

    return (
      <Alert
        type={alertType}
        showIcon
        message={finalMessage}
        description={errorInfo.error.message}
        banner
        closable
      />
    );
  }

  return <ErrorBoundary onCatch={handleCatch}>{children}</ErrorBoundary>;
}
