import type { FieldProps } from "@fluentui/react-components";
import { Field, Input } from "@fluentui/react-components";
import { useFormContext } from "react-hook-form";

interface InputProps extends Partial<FieldProps> {
	name: string;
	message?: string;
	type: "password" | "text" | "email"
}

export default function InputFormField(props: InputProps) {
	const { register } = useFormContext();
	return (
		<Field
			label="Example field"
			validationState={props.message ? "error" : "none"}
			validationMessage={props.message}
			{...props}
		>
			<Input {...register(props.name)} type={props.type}/>
		</Field>
	);
}
