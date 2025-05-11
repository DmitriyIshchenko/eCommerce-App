import { Field, Input, makeStyles, type FieldProps, type InputProps } from "@fluentui/react-components";
import { useFormContext } from "react-hook-form";

const useClasses = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		gap: "2px",
	},
	field: {
		minHeight: "80px",
		alignContent: "start",
		"&>label": {
			height: "20px",
		},
	},
	input: {
		height: "32px",
	},
});

interface Props extends Partial<FieldProps> {
	message: string;
	name: string;
	type?: InputProps["type"];
	placeholder?: string;
	contentBefore?: InputProps["contentBefore"];
	contentAfter?: InputProps["contentAfter"];
}

export default function HookFormField(props: Props) {
  const classes = useClasses();
  const {register,getFieldState} = useFormContext();
  	const {
		message,
		type,
		name,
		placeholder,
		contentAfter,
		contentBefore,
	} = props;
	const getValidationState = () => {
		if (message) return "error";
		if (getFieldState(name).isDirty) return "success";
		return "none";
	}

	const getValidationMessage = () => {
		if (message) return message;
		if (getFieldState(name).isDirty) return "and you look good today";
	}

  return (
   		<Field
			validationState={getValidationState()}
			validationMessage={getValidationMessage()}
			{...props}
			className={classes.field}
			
		>
			<Input
				className={classes.input}
				type={type}
				placeholder={placeholder}
				contentAfter={contentAfter}
				contentBefore={contentBefore}
				{...register(name)}
			/>
		</Field>
  )
}