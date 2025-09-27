import { FC, useState } from 'react';
import { AlertProps, AlertType } from '../types';

const typeToColor: Record<AlertType, string> = {
  success: '#52c41a',
  info: '#1890ff',
  warning: '#faad14',
  error: '#ff4d4f',
};

const typeToIcon: Record<AlertType, React.ReactNode> = {
  success: (
    <span role="img" aria-label="success">
      ✔️
    </span>
  ),
  info: (
    <span role="img" aria-label="info">
      ℹ️
    </span>
  ),
  warning: (
    <span role="img" aria-label="warning">
      ⚠️
    </span>
  ),
  error: (
    <span role="img" aria-label="error">
      ❌
    </span>
  ),
};

export function Alert({
  type = 'info',
  message,
  description,
  closable = false,
  closeIcon,
  showIcon = false,
  icon,
  banner = false,
  onClose,
  action,
}: AlertProps) {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setClosed(true);
    onClose?.(e);
  };

  const alertType = banner ? 'warning' : type;

  return (
    <div
      style={{
        border: `1px solid ${typeToColor[alertType]}`,
        background: banner ? '#fffbe6' : '#fff',
        color: '#222',
        padding: description ? '20px 24px' : '8px 12px',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'flex-start',
        position: 'relative',
        fontFamily: 'sans-serif',
      }}
    >
      {showIcon && (
        <span style={{ marginRight: 12, fontSize: description ? 24 : 18 }}>
          {icon || typeToIcon[alertType]}
        </span>
      )}
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 500 }}>{message}</div>
        {description && (
          <div style={{ marginTop: 4, color: '#555' }}>{description}</div>
        )}
        {action && <div style={{ marginTop: 8 }}>{action}</div>}
      </div>
      {closable && (
        <button
          onClick={handleClose}
          aria-label="close"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            marginLeft: 16,
            fontSize: 18,
          }}
        >
          {closeIcon || '✖'}
        </button>
      )}
    </div>
  );
}
