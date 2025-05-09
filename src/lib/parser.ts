import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  age: z.number({message: "CUSTOM MESSAGE"}),
  hobbies: z.array(z.string()).optional(),
  password: z.string().email("")
})

const userVasya: z.infer<typeof userSchema> = {
  age: 1,
  name: "Vasya",
  password: "123"
}

const data = userSchema.parse({age: 12, name: "Petia", password: "123"});
const result = userSchema.safeParse({age: 12, name: "Petia"});

console.log(data, result);