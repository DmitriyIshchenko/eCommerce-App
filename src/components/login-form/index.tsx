/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, makeStyles } from "@fluentui/react-components";
import { SendFilled } from "@fluentui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { login } from "../../lib/services/login-service";
import InputFormField from "../ui/input-field";

const useStyles = makeStyles({
	wrapper: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		flexGrow: 1,
	},
	form: {
		display: "flex",
		flexDirection: "column",
		gap: "8px",
		maxWidth: "256px",
	},
	button: {
		marginTop: "16px",
	},
});

const userSchema = z.object({
	email: z
		.string()
		.regex(/[@]/g, "must contain an '@' symbol")
		.email("bad format, use a@b.cd"),
	password: z
		.string()
		.min(8, "at least 8 characters long")
		.regex(/[A-Z]/g, "at least one uppercase letter (A-Z)")
		.regex(/[a-z]/g, "at least one lowercase letter (a-z)")
		.regex(/[0-9]/g, "at least one digit (0-9)")
		.regex(/[!@#$%^&*]/g, "at least one special character (e.g., !@#$%^&*)"),
	addresses: z.array(z.string()),
});

export type UserSchema = z.infer<typeof userSchema>;

// eslint-disable-next-line max-lines-per-function
export default function LoginForm() {
	const methods = useForm<UserSchema>({
		resolver: zodResolver(userSchema),
	});
	const styles = useStyles();

	const {
		handleSubmit,
		formState: { errors },
	} = methods;

	// const {setAuthorized} = useUser()

	const onSubmit = async (d: UserSchema) => {
		const result = await login(d);
		// setAuthorized(result);
	};

	return (
		<div className={styles.wrapper}>
			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<InputFormField
						label="E-mail"
						message={errors.email?.message ?? ""}
						name="email"
						type="text"
					/>
					<InputFormField
						label="Password"
						message={errors.password?.message ?? ""}
						name="password"
						type="text"
					/>
					<InputFormField
						label="Adress"
						message={errors.password?.message ?? ""}
						name="adress"
						type="text"
					/>
					<Button
						type="submit"
						appearance="primary"
						icon={<SendFilled />}
						iconPosition="after"
						className={styles.button}
					>
						Submit
					</Button>
				</form>
			</FormProvider>
		</div>
	);
}
