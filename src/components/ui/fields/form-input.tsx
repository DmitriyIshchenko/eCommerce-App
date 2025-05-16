import {
	Field,
	type FieldProps,
	Input,
	type InputProps,
	makeStyles,
} from "@fluentui/react-components";
import { useFormContext } from "react-hook-form";

const useClasses = makeStyles({
	field: {
		minHeight: "5rem",
		alignContent: "start",
		"&>label": {
			height: "20px",
		},
	},
});

interface Props extends Partial<InputProps> {
	message?: string;
	name: string;
	label?: FieldProps["label"];
	required?: FieldProps["required"];
}

export default function FormFieldInput(props: Props) {
	const classes = useClasses();
	const { register } = useFormContext();
	const {
		message,
		label,
		name,
		required,
	} = props;

	return (
		<Field
			validationState={message ? "error" : "none"}
			validationMessage={message}
			className={classes.field}
			label={label}
			required={required}
		>
			<Input
				{...props}
				{...register(name)}
			/>
		</Field>
	);
}
