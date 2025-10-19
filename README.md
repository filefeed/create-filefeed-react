# Filefeed React Boilerplate

Ultra-minimal React starter showing how to add the Filefeed importer in minutes.

## Quickstart

1) Install dependencies
```bash
npm install
```

2) Start the dev server
```bash
npm start
```

3) Try the importer
- Click "Open Importer" and drop `getting-started.csv`.

## Where to customize

- Edit the sheet schema in `src/components/Filefeed/FilefeedQuickstart.tsx` (the `fields` array).
- Handle submission in the `onSubmit` handler of the `FilefeedSheet` component.

## Minimal usage

```tsx
// src/App.tsx
import FilefeedImporter from './FilefeedImporter';

export default function App() {
  return <FilefeedImporter />;
}
```
