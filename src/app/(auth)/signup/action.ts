"use server";

import { SignupFormSchema, FormState } from "@/app/lib/definitions";
import { createSession } from "@/app/lib/session";
import { executeQuery } from "@/utils/mysql";
import { saltAndHash } from "@/utils/password";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

// Form fields
type fields = {
  name: FormDataEntryValue | null,
  username: FormDataEntryValue | null,
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null
}

// Check if field exist on DB ------> true = NOT exist  -----  false = exist
export async function fieldChecker(type: string, value: string | undefined) {
  // Check if email exist
  if(type === 'email' && await executeQuery(`SELECT id FROM users WHERE email = '${value}'`, null) == null) {
    return true
  }
  // Check if username exist
  if(type === 'username' && await executeQuery(`SELECT id FROM users WHERE username = '${value}'`, null) == null) {
    return true
  }

  return false
}

async function signupFormCHecker(data: fields) {
  // Validate form
  let validatedFields = await SignupFormSchema.safeParse(data)

  // Check if user or email already exist
  if(validatedFields.success) {
    // Check data on DB
    const emailCheck = await fieldChecker('email', data.email?.toString())
    const usernameCheck = await fieldChecker('username', data.username?.toString())

    // 
    if(emailCheck && usernameCheck) {
      return validatedFields
    }
  }

  validatedFields.success = false;
  // Return form status
  return validatedFields
}

export async function signup(state: FormState, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Generate a randomic id
  const id: string = randomUUID();

  // 2. Prepare data for insertion into database
  const { name, username, email, password } = validatedFields.data;
  // Hash and salt the user's password before storing it
  const {salt, hashedPassword} = await saltAndHash(password);

  // 3. Insert the user into the database
  if(await executeQuery(
    `INSERT INTO users (user_id, name, username, email, password) VALUES ('${id}', '${username}', '${name}', '${email}', '${hashedPassword}')`,
    null,
  ) !== null) {
    // Save salt on DB
    if(await executeQuery(
      `UPDATE password SET salt = '${salt}' WHERE user_id = '${id}'`,
      null,
    ) !== null) {
      // 4. Create user session
      await createSession(id);
      // 5. Redirect user to the profile page
      redirect("/");
    }
  }


  return {
    message: "Error during sign in"
  }
}