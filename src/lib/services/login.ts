import { LOGIN_API_URL, METHODS } from "../constants";
import { type LoginSchema, loginSchema } from "../schemas";

const url = new URL(LOGIN_API_URL);

const headers = {
	"Content-type": "application/json; charset=UTF-8",
};

export async function login(userData: LoginSchema) {
	const response = await fetch(url, {
		method: METHODS.POST,
		body: JSON.stringify(userData),
		headers,
	});
	if (!response.ok) throw new Error(`network problem, code ${response.status}`);
	const data = loginSchema.parse(await response.json());
	return data;
}
