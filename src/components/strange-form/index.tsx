import {
	Accessibility20Filled,
	Add12Filled,
	Airplane20Filled,
	AnimalCat20Filled,
	ArrowRight20Filled,
	BotSparkle20Filled,
} from "@fluentui/react-icons";
import { useRef, useState } from "react";
import CustomButton from "../ui/buttons/custom";
import DarkButton from "../ui/buttons/wrapped-button";
import ButtonLink from "../ui/links/button";

export default function StrangeForm() {
	const [v, setV] = useState("");
	const [err, setErr] = useState("");
	const sendForm = (data: string) => data;
	const inputRef = useRef(null);
	console.log(inputRef.current);
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				console.log(e);
				console.log(inputRef);
				if (v.length < 8) setErr("at least 8 characters");
				else {
					setErr("");
					sendForm(v);
				}
			}}
		>
			<label htmlFor="password">password</label>
			<input
				name="password"
				id="password"
				onChange={(e) => {
					setV(e.target.value);
				}}
				ref={inputRef}
				min={4}
			/>
			<p style={{ color: "red", margin: 0, minHeight: 24 }}>{err}</p>
			<CustomButton appearance="tertiary" type="submit">
				Submit
			</CustomButton>
			<DarkButton type="submit" shape="rounded">
				Submit
				<Add12Filled style={{ marginLeft: 8 }} />
			</DarkButton>
			<div
				style={{
					display: "none",
					flexDirection: "column",
					gap: 8,
					padding: 8,
					backgroundColor: "gray",
				}}
			>
				<div style={{ display: "flex", gap: 8 }}>
					<ButtonLink
						to=""
						text="address"
						icon={<ArrowRight20Filled />}
						appearance="outline"
						color="straight"
					/>
					<ButtonLink
						to=""
						text="address"
						icon={<ArrowRight20Filled />}
						appearance="outline"
						color="inverted"
					/>
					<ButtonLink
						to=""
						text="address"
						icon={<ArrowRight20Filled />}
						appearance="filled"
						color="straight"
					/>
					<ButtonLink
						to=""
						text="address"
						icon={<ArrowRight20Filled />}
						appearance="filled"
						color="inverted"
					/>
				</div>
				<div style={{ display: "flex", gap: 8 }}>
					<ButtonLink
						to=""
						text="Cookie"
						icon={<Accessibility20Filled />}
						appearance="outline"
						color="straight"
					/>
					<ButtonLink
						to=""
						text="Airplane"
						icon={<Airplane20Filled />}
						appearance="outline"
						color="inverted"
					/>
					<ButtonLink
						to=""
						text="Cat"
						icon={<AnimalCat20Filled />}
						appearance="filled"
						color="straight"
					/>
					<ButtonLink
						to=""
						text="bot"
						icon={<BotSparkle20Filled />}
						appearance="filled"
						color="inverted"
					/>
				</div>
			</div>
		</form>
	);
}
