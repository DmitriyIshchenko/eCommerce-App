import type { UserSchema } from "../../components/login-form";

export const login = async (data: UserSchema) =>  {
  const response = await fetch("backend-url", {method: "POST"});
  //...
  return true;
}