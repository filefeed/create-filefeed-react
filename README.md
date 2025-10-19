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
- You can also use the "Download sample CSV" link in the UI.

## Where to customize

- Edit fields in `src/FilefeedImporter.tsx` (`sheetConfig.fields`).
- Handle submission in `onSubmit` of `FilefeedSheet`.

## Minimal usage

```tsx
// src/App.tsx
import FilefeedImporter from './FilefeedImporter';

export default function App() {
  return <FilefeedImporter />;
}
```
