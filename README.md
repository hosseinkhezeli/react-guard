# react-guard

**React Guard** is a lightweight, zero-dependency React error boundary component.  
It catches JavaScript errors in its child component tree and displays a customizable fallback UI.  

- Fully TypeScript typed  
- Multi-lingual default messages (English/Farsi)  
- Minimal dependencies, tree-shakable, ESM & CJS builds  
- No provider layers required  

---

## Installation

```bash
npm install react-guard
# or
yarn add react-guard
```

Peer dependencies:

```bash
npm install react react-dom
```

---

## Usage

### Basic Usage

```tsx
import React from 'react';
import { Guard } from 'react-guard';

function MyComponent() {
  throw new Error('Oops!');
  return <div>Hello</div>;
}

export default function App() {
  return (
    <Guard>
      <MyComponent />
    </Guard>
  );
}
```

- By default, `Guard` displays a simple error message with an alert.

---

### Custom Message

```tsx
<Guard message="Something went wrong">
  <MyComponent />
</Guard>
```

---

### Custom Fallback UI

```tsx
<Guard
  Fallback={({ error, info }) => (
    <div style={{ color: 'red' }}>
      <h2>Custom Error!</h2>
      <p>{error.message}</p>
    </div>
  )}
>
  <MyComponent />
</Guard>
```

---

### Props

| Prop       | Type                                         | Default    | Description |
|------------|---------------------------------------------|------------|------------|
| `children` | `React.ReactElement`                         | —          | The component(s) to wrap. |
| `Fallback` | `(info: { error: Error; info: ErrorInfo }) => ReactElement` | `undefined` | Optional custom fallback UI. |
| `onError`  | `(error: Error, info: ErrorInfo) => void`   | `undefined` | Callback triggered when an error occurs. |
| `name`     | `string`                                     | `undefined` | Component name used in default error message. |
| `message`  | `string`                                     | `undefined` | Override the default error message. |
| `alertType`| `'success' | 'info' | 'warning' | 'error'`  | `'error'`  | Type of alert for default message. |

---

### TypeScript Support

```ts
import type { GuardProps } from 'react-guard';
```

- Fully typed for props and error info.  
- Default alert component is typed as well.

---

### Tree-Shaking

- Only the components you import (`Guard`, `Alert`) are included in your bundle.  
- `sideEffects: false` ensures minimal footprint when used in ESM projects.

---

### Styling

- The default alert is minimal, inline-styled, and self-contained.  
- You can pass a custom `Fallback` component for advanced styling.

---

### Multi-Lingual Support

- Detects `navigator.language` and switches messages for Farsi (`fa`) or defaults to English.  
- Optional `message` prop overrides the default.

---

### License

MIT © Your Name

---

### Notes

- Works with React 18+  
- No external UI dependencies required  
- Perfect for both small and large projects

