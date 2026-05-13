# odontogram-view

Librería reusable para React que renderiza un odontograma clínico editable con dentición permanente, temporal y mixta.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Uso

```tsx
import { Odontogram } from "odontogram-view";
import "odontogram-view/styles.css";

const initialValue = [
  {
    tooth: "26",
    surfaces: {
      O: ["CARIES"]
    }
  },
  {
    tooth: "11",
    conditions: ["CROWN"]
  }
];

export function Example() {
  const [data, setData] = useState(initialValue);

  return <Odontogram value={data} onChange={setData} dentition="mixed" />;
}
```
