import { Field, makeStyles, type FieldProps } from "@fluentui/react-components";
import {
	DatePicker,
	type DatePickerProps,
} from "@fluentui/react-datepicker-compat";
import { Controller, useFormContext } from "react-hook-form";

const useClasses = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		gap: "2px",
	},
	field: {
		minHeight: "5rem",
		alignContent: "start",
		"&>label": {
			height: "20px",
		},
	},
});

interface Props extends Partial<DatePickerProps> {
	message?: string;
	name: string;
	label?: FieldProps["label"];
	required?: FieldProps["required"];
}

export default function FormFieldDatePicker(props: Props) {
	const classes = useClasses();
	const { control } = useFormContext();
	const { message, name, label, required } =
		props;
	return (
		<Field
			validationState={message ? "error" : "none"}
			validationMessage={message}
			className={classes.field}
			label={label}
			required={required}
		>
			<Controller
				name={name}
				control={control}
				defaultValue={""}
				render={({ field }) => (
					<DatePicker
						onSelectDate={field.onChange}
						{...props}
					/>
				)}
			/>
		</Field>
	);
}
