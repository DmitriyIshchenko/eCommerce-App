import { LOGIN_API_URL, METHODS } from "../constants";
import { type RegistrationSchema, registrationSchema } from "../schemas";

const url = new URL(LOGIN_API_URL);

const headers = {
	"Content-type": "application/json; charset=UTF-8",
};

export async function registration(userData: RegistrationSchema) {
	const response = await fetch(url, {
		method: METHODS.POST,
		body: JSON.stringify(userData),
		headers,
	});
	if (!response.ok) throw new Error(`network problem, code ${response.status}`);
	const data = registrationSchema.parse(await response.json());
	return data;
}
