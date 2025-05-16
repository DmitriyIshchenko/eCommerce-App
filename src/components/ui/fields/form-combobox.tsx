import {
	Combobox,
	type ComboboxProps,
	Field,
	type FieldProps,
	makeStyles,
	useComboboxFilter,
} from "@fluentui/react-components";
import { type ReactNode, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const useClasses = makeStyles({
	field: {
		minHeight: "5rem",
		alignContent: "start",
		"&>label": {
			height: "20px",
		},
		"& input": {
			paddingLeft: "34px",
		},
	},
});

interface Props extends Partial<FieldProps> {
	message?: string;
	name: string;
	onOptionsSelect?: ComboboxProps["onOptionSelect"];
	placeholder?: string;
	options: { children: ReactNode; value: string }[];
}

export default function FormFieldComboBox(props: Props) {
	const classes = useClasses();
	const { control } = useFormContext();
	const { message, placeholder, name, onOptionsSelect, options } = props;
	const [query, setQuery] = useState("");

	const filteredOptions = useComboboxFilter(query, options, {
		noOptionsMessage: "No countries match your search.",
	});

	return (
		<Field
			validationState={message ? "error" : "none"}
			validationMessage={message}
			{...props}
			className={classes.field}
		>
			<Controller
				name={name}
				control={control}
				defaultValue={""}
				render={({ field }) => (
					<Combobox
						placeholder={placeholder}
						name={name}
						value={field.value}
						onOptionSelect={(e, d) => {
							if (onOptionsSelect) onOptionsSelect(e, d);
							field.onChange(d.optionValue);
						}}
						onChange={(e) => {
							setQuery(e.target.value);
						}}
					>
						{filteredOptions}
					</Combobox>
				)}
			/>
		</Field>
	);
}
