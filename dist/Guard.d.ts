import type { GuardProps } from './types';
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
export declare function Guard({ children, Fallback, onError, name, message, alertType, }: GuardProps): import("react/jsx-runtime").JSX.Element;
