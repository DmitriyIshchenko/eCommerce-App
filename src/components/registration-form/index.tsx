import {
	Button,
	Checkbox,
	InfoLabel,
	type SelectTabData,
	type SelectTabEvent,
	Tab,
	TabList,
	type TabValue,
	Toast,
	ToastBody,
	ToastTitle,
	makeStyles,
	tokens,
	useToastController,
} from "@fluentui/react-components";
import {
	AddFilled,
	CalendarAddRegular,
	CityRegular,
	DeleteRegular,
	DocumentArrowRightRegular,
	Globe20Regular,
	KeyRegular,
	LocationFilled,
	LocationRegular,
	MailRegular,
	NumberRowRegular,
	PersonCircleFilled,
	PersonCircleRegular,
	PersonRegular,
	SendRegular,
	StreetSignRegular,
} from "@fluentui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Confetti from "react-confetti";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useLoading } from "../../hooks/use-loading";
import { useUser } from "../../hooks/use-user";
import { TOASTER_ID } from "../../lib/constants";
import {
	type AddressSchema,
	type RegistrationSchema,
	registrationSchema,
} from "../../lib/schemas";
import { registration } from "../../lib/services/registration";
import ShowHideButton from "../ui/buttons/show-hide";
import FormCheckbox from "../ui/fields/form-checkbox";
import FormFieldComboBox from "../ui/fields/form-combobox";
import FormFieldDatePicker from "../ui/fields/form-date-picker";
import FormFieldInput from "../ui/fields/form-input";
import { useCheckboxClasses } from "../ui/fields/hooks";
import { countries, countryOptions } from "./country-options";

const useClasses = makeStyles({
	wrapper: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		flexGrow: 1,
		flexDirection: "column",
		rowGap: tokens.spacingVerticalXL,
	},
	form: {
		flexDirection: "column",
		width: "280px",
	},
	after: {
		position: "relative",
		left: "8px",
	},
	before: {
		position: "relative",
		right: "2px",
	},
	button: {
		marginTop: tokens.spacingVerticalM,
		width: "100%",
	},
	toast: {
		lineHeight: "1.5",
	},
	group: { minHeight: "400px", display: "flex", flexDirection: "column" },
	combic: {
		paddingLeft: "40px",
	},
	icon: {
		color: tokens.colorNeutralForeground3,
		position: "absolute",
		top: "28px",
		left: "9px",
		zIndex: "1",
	},
});

const defaultBilling: AddressSchema = {
	city: "",
	country: "",
	default: false,
	street: "",
	zip: "",
};

export default function RegistrationForm() {
	const classes = useClasses();
	const checkboxClasses = useCheckboxClasses();
	const [show, setShow] = useState(false);
	const methods = useForm<RegistrationSchema>({
		resolver: zodResolver(registrationSchema),
		defaultValues: {
			billing: [defaultBilling],
		},
	});
	const {
		handleSubmit,
		formState: { errors },
		trigger,
		clearErrors,
		setValue,
		control,
	} = methods;

	const { authorized, setAuthorized } = useUser();
	const { loading, setLoading } = useLoading();
	const { fields, append, remove } = useFieldArray({
		control,
		name: "billing",
	});

	const { dispatchToast } = useToastController(TOASTER_ID);

	const notify = (name: string, email: string) =>
		dispatchToast(
			<Toast>
				<ToastTitle>Congratulations, {name}!</ToastTitle>
				<ToastBody className={classes.toast}>
					You have been successfully registered and logged in
					<br /> with {email} address
				</ToastBody>
			</Toast>,
			{ intent: "success", timeout: 4000 },
		);

	const onSubmit = async (d: RegistrationSchema) => {
		try {
			setLoading(true);
			const result = await registration(d);
			setAuthorized(true);
			notify(result.personal.firstName, result.personal.email);
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	};
	const [selectedValue, setSelectedValue] = useState<TabValue>("personal");
	const [shippingPcFormat, setShippingPcFormat] = useState("");
	const [billingPcFormat, setBillingPcFormat] = useState("");

	const onTabSelect = (_: SelectTabEvent, { value }: SelectTabData) => {
		if (value === "personal" || value === "shipping" || value === "billing") {
			clearErrors(value);
			if (value === "personal") void trigger(["shipping", "billing"]);
			if (value === "shipping") void trigger(["personal", "billing"]);
			if (value === "billing") void trigger(["personal", "shipping"]);
		}
		setSelectedValue(value);
	};

	const [shippingAsBilling, setShippingAsBilling] = useState(false);
	const [step, setStep] = useState(0);
	const checkFirstStep = async () => {
		const isValid = await trigger("personal");
		if (isValid) {
			setStep(Math.max(step, 1));
			setSelectedValue("shipping");
			setTimeout(() => clearErrors("shipping"));
		}
	};
	const checkSecondStep = async () => {
		const isValid = await trigger("shipping");
		if (isValid && !shippingAsBilling) {
			setStep(Math.max(step, 2));
			if (step > 0) setSelectedValue("billing");
			setTimeout(() => clearErrors("billing"));
		}
	};

	return (
		<div className={classes.wrapper}>
			<TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
				<Tab
					value={"personal"}
					icon={<PersonRegular />}
					disabled={
						!!errors.shipping || (shippingAsBilling && !!errors.billing)
					}
				>
					Personal
				</Tab>
				<Tab
					value={"shipping"}
					icon={<LocationFilled />}
					disabled={
						step < 1 ||
						!!errors.personal ||
						(!!errors.billing && shippingAsBilling)
					}
				>
					Shipping
				</Tab>
				<Tab
					value={"billing"}
					icon={<LocationRegular />}
					disabled={
						shippingAsBilling ||
						step < 2 ||
						!!errors.personal ||
						!!errors.shipping
					}
				>
					Billing
				</Tab>
			</TabList>
			<FormProvider {...methods}>
				<form
					onSubmit={(e) => {
						void handleSubmit(onSubmit)(e);
					}}
					className={classes.form}
				>
					<div hidden={selectedValue !== "personal"}>
						<div className={classes.group}>
							<FormFieldInput
								label="E-mail"
								placeholder="type email here..."
								contentBefore={<MailRegular className={classes.before} />}
								message={errors.personal?.email?.message}
								name="personal.email"
							/>
							<FormFieldInput
								label="Password"
								placeholder="type password here..."
								contentBefore={<KeyRegular className={classes.before} />}
								contentAfter={
									<ShowHideButton
										className={classes.after}
										onClick={() => setShow(!show)}
										show={show}
									/>
								}
								message={errors.personal?.password?.message}
								name="personal.password"
								type={show ? "text" : "password"}
							/>
							<FormFieldInput
								label="First name"
								placeholder="type first name here..."
								contentBefore={
									<PersonCircleRegular className={classes.before} />
								}
								message={errors.personal?.firstName?.message}
								name="personal.firstName"
							/>
							<FormFieldInput
								label="Last name"
								placeholder="type last name here..."
								contentBefore={
									<PersonCircleFilled className={classes.before} />
								}
								message={errors.personal?.lastName?.message}
								name="personal.lastName"
							/>
							<FormFieldDatePicker
								label="Date of birth"
								message={errors.personal?.dateOfBirth?.message}
								showMonthPickerAsOverlay
								name="personal.dateOfBirth"
								contentBefore={
									<CalendarAddRegular className={classes.before} />
								}
								contentAfter={<span />}
								placeholder="pick a birth date..."
								showCloseButton
							/>
						</div>
						<Button
							type="submit"
							appearance="primary"
							icon={<DocumentArrowRightRegular />}
							iconPosition="after"
							className={classes.button}
							onClick={() => void checkFirstStep()}
						>
							Next
						</Button>
					</div>
					<div hidden={selectedValue !== "shipping"}>
						<div className={classes.group}>
							<FormFieldInput
								label="Street"
								placeholder="type street here..."
								contentBefore={<StreetSignRegular className={classes.before} />}
								message={errors.shipping?.[0]?.street?.message}
								name="shipping.0.street"
							/>
							<FormFieldInput
								label="City"
								placeholder="type city here..."
								contentBefore={<CityRegular className={classes.before} />}
								message={errors.shipping?.[0]?.city?.message}
								name="shipping.0.city"
							/>
							<div style={{ position: "relative" }}>
								<Globe20Regular className={classes.icon} />
								<FormFieldComboBox
									message={errors.shipping?.[0]?.country?.message}
									name="shipping.0.country"
									label="Country"
									placeholder="type country here..."
									onOptionsSelect={(_, d) => {
										if (d.optionValue && d.optionValue in countries) {
											setShippingPcFormat(countries[d.optionValue]?.zipFormat);
											setTimeout(() => void trigger("shipping.0.zip"));
										} else {
											setShippingPcFormat("");
										}
									}}
									options={countryOptions}
								/>
							</div>
							<FormFieldInput
								label={
									<InfoLabel
										info={shippingPcFormat && `format: ${shippingPcFormat}`}
									>
										Postal Code
									</InfoLabel>
								}
								placeholder="type postcode here..."
								contentBefore={<NumberRowRegular className={classes.before} />}
								message={errors.shipping?.[0]?.zip?.message}
								name="shipping.0.zip"
							/>
							<FormCheckbox
								name="shipping.0.default"
								labelPosition="before"
								label="Use as default for shipping"
								className={checkboxClasses.root}
							/>
							<Checkbox
								labelPosition="before"
								label="Use shipping address as billing"
								onChange={(e) => {
									if (e.target.checked) {
										setValue("billing", []);
										clearErrors("billing");
									}
									setShippingAsBilling(e.target.checked);
								}}
								className={checkboxClasses.root}
								checked={shippingAsBilling}
							/>
						</div>
						<Button
							type="submit"
							appearance="primary"
							icon={
								shippingAsBilling ? (
									<SendRegular />
								) : (
									<DocumentArrowRightRegular />
								)
							}
							disabled={shippingAsBilling && loading}
							iconPosition="after"
							className={classes.button}
							onClick={() => void checkSecondStep()}
						>
							{shippingAsBilling ? "Submit" : "Next"}
						</Button>
					</div>
					{selectedValue === "billing" && !shippingAsBilling && (
						<div>
							{fields.map((field, index) => (
								<div className={classes.group} key={field.id}>
									<FormFieldInput
										label="Street"
										placeholder="type street here..."
										contentBefore={
											<StreetSignRegular className={classes.before} />
										}
										message={errors.billing?.[index]?.street?.message}
										name={`billing.${index}.street`}
									/>
									<FormFieldInput
										label="City"
										placeholder="type city here..."
										contentBefore={<CityRegular className={classes.before} />}
										message={errors.billing?.[index]?.city?.message}
										name={`billing.${index}.city`}
									/>
									<div style={{ position: "relative" }}>
										<Globe20Regular className={classes.icon} />
										<FormFieldComboBox
											message={errors.billing?.[index]?.country?.message}
											name={`billing.${index}.country`}
											label="Country"
											placeholder="type country here..."
											onOptionsSelect={(_, d) => {
												if (d.optionValue && d.optionValue in countries) {
													setBillingPcFormat(
														countries[d.optionValue]?.zipFormat,
													);
												} else {
													setBillingPcFormat("");
												}
											}}
											options={countryOptions}
										/>
									</div>
									<FormFieldInput
										label={
											<InfoLabel
												info={billingPcFormat && `format: ${billingPcFormat}`}
											>
												Postal Code
											</InfoLabel>
										}
										placeholder="type postcode here..."
										contentBefore={
											<NumberRowRegular className={classes.before} />
										}
										message={errors.billing?.[index]?.zip?.message}
										name={`billing.${index}.zip`}
									/>
									<FormCheckbox
										name={`billing.${index}.default`}
										labelPosition="before"
										label="Use as default for billing"
										className={checkboxClasses.root}
									/>
									<Button
										icon={<DeleteRegular />}
										onClick={() => remove(index)}
										disabled={fields.length < 2}
									>
										REMOVE
									</Button>
								</div>
							))}
							<Button
								type="button"
								appearance="secondary"
								icon={<AddFilled />}
								onClick={() => append(defaultBilling)}
							>
								ADD
							</Button>
							<Button
								type="submit"
								appearance="primary"
								icon={<SendRegular />}
								iconPosition="after"
								className={classes.button}
								disabled={loading}
							>
								Submit
							</Button>
						</div>
					)}
					{authorized && (
						<Confetti
							width={window.innerWidth - 1}
							height={window.innerHeight - 1}
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
