import { useState } from 'react';

function ChildB({ b, onChange }: { b: number; onChange: (v: number) => void }) {
  return (
    <div>
      <input value={b} type="number" onChange={(e) => onChange(+e.target.value)} />
    </div>
  );
}

function ParentA() {
  const [a, setA] = useState(2);
  return (
    <div>
      <h1>A equals {a}</h1>
      <ChildB b={a} onChange={setA} />
    </div>
  );
}

export default function Example2() {
  return <ParentA />;
}
