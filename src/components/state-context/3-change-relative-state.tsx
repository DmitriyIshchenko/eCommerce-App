import { useState } from "react";

function ChildB({onChange}: {onChange: (v: number) => void}) {
  return (
    <div>
      <input type="number" onChange={(e) => onChange(+e.target.value)}/>
    </div>
  );
}

function ChildA({a}: {a: number}) {

  return (
    <div>
      <h1>A equals {a}</h1>
    </div>
  );
}

function Parent() {
    const [a, setA] = useState(1);
  return (
    <div>
      <ChildA a={a}/>
      <ChildB onChange={setA}/>
    </div>
  );
}

export default function Example3() {
  return <Parent />;
}
