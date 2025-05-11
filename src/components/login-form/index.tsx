import {
	Button,
	Toast,
	ToastBody,
	ToastTitle,
	Toaster,
	makeStyles,
	tokens,
	useToastController,
} from "@fluentui/react-components";
import { KeyRegular, MailRegular, SendFilled } from "@fluentui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState } from "react";
import Confetti from "react-confetti";
import { FormProvider, useForm } from "react-hook-form";
import { useUser } from "../../hooks/use-user";
import { type LoginSchema, loginSchema } from "../../lib/schemas";
import { login } from "../../lib/services/login";
import ShowHideButton from "../ui/buttons/show-hide";
import HookFormField from "../ui/hook-form-field";

const useClasses = makeStyles({
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
		width: "280px",
	},
	eye: {
		position: "relative",
		left: "8px",
	},
	button: {
		marginTop: tokens.spacingVerticalM,
	},
  toast: {
    lineHeight: "1.5",
  }
});

export default function LoginForm() {
	const classes = useClasses();
	const [show, setShow] = useState(false);
	const methods = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
	});
	const {
		handleSubmit,
		formState: { errors },
	} = methods;
	const { authorized, setAuthorized } = useUser();

	const toasterId = useId();
	const { dispatchToast } = useToastController(toasterId);

	const notify = (email: string) =>
		dispatchToast(
			<Toast>
				<ToastTitle>Congratulations!</ToastTitle>
				<ToastBody className={classes.toast}>
					You have been successfully logged in
					<br /> with {email} address
				</ToastBody>
			</Toast>,
			{ intent: "success" },
		);

	const onSubmit = async (d: LoginSchema) => {
		try {
			const result = await login(d);
			setAuthorized(true); // если без ошибок изменяем состояние в контексте, чтобы сделать редирект на главную смотрите доку по хуку useRouter - он вернёт роутер в котором можно вызвать метод навигации
			notify(result.email);
      // логика редиректа по таймауту 
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className={classes.wrapper}>
			<FormProvider {...methods}>
				<form
					onSubmit={(e) => {
						void handleSubmit(onSubmit)(e);
					}}
					className={classes.form}
				>
					<HookFormField
						label="E-mail"
						placeholder="type email here..."
						contentBefore={<MailRegular />}
						message={errors.email?.message ?? ""}
						name="email"
					/>
					<HookFormField
						label="Password"
						placeholder="type password here..."
						contentBefore={<KeyRegular />}
						contentAfter={
							<ShowHideButton
								className={classes.eye}
								onClick={() => setShow(!show)}
								show={show}
							/>
						}
						message={errors.password?.message ?? ""}
						name="password"
						type={show ? "text" : "password"}
					/>
					<Button
						type="submit"
						appearance="primary"
						icon={<SendFilled />}
						iconPosition="after"
						className={classes.button}
					>
						Submit
					</Button>
					<Toaster toasterId={toasterId} />
					{authorized && (
						<Confetti
							width={window.innerWidth}
							height={window.innerHeight}
							recycle={false}
							numberOfPieces={512} 
              gravity={0.2}
              initialVelocityY={20}
              tweenDuration={2000}
						/>
					)}
				</form>
			</FormProvider>
		</div>
	);
}
