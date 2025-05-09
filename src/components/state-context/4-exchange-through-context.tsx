import { useExample } from "./context";

function ChildA() {
	const { a, setA } = useExample();

	return (
		<div>
			<button type="button" onClick={() => setA(a + 1)}>
				increase A
			</button>
			<button type="button" onClick={() => setA(a - 1)}>
				decrease A
			</button>
			<ChildB />
		</div>
	);
}
function ChildB() {
	const {b, setB} = useExample();
	return (
		<div>
			<input value={b} onChange={(e) => setB(+e.target.value)} type="number"/>
			<ChildC />
		</div>
	);
}
function ChildC() {
	const {c, setC} = useExample();
	return (
		<div>
			<button type="button" onClick={() => setC(c + c[0])}>
				make C longer
			</button>
			<button type="button" onClick={() => setC(c.slice(0, -1))}>
				make C shorter
			</button>
		</div>
	);
}

function Parent() {
	const { a, b, c } = useExample();

	return (
		<div>
			<p>A is {a}</p>
			<p>B is {b}</p>
			<p>C is {c}</p>
			<ChildA />
		</div>
	);
}

export default function Example4() {
	return <Parent />;
}
