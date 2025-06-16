function ChildC({ c }: { c: string }) {
  return <h3>C is {c}</h3>;
}

function ChildB({ b, c }: { b: number; c: string }) {
  return (
    <div>
      <h2>B equals {b}</h2>
      <ChildC c={c} />
    </div>
  );
}

function ParentA({ a, b, c }: { a: number; b: number; c: string }) {
  return (
    <div>
      <h1>A equals {a}</h1>
      <ChildB b={b} c={c} />
    </div>
  );
}

export default function Example1() {
  return <ParentA a={1} b={2} c={'c'} />;
}
