"use server";

import { FormState, LoginFormSchema } from "@/app/lib/definitions";
import { createSession } from "@/app/lib/session";
import { executeQuery } from "@/utils/mysql";
import { comparePasswords } from "@/utils/password";
import { redirect } from "next/navigation";

export async function login(state: FormState, formData: FormData) {
  // 1. Validate form fields
  const userEmail = formData.get("userEmail") as string
  const password = formData.get("password") as string

  // 2. Get password from the DB
  const data: any = await executeQuery(
    `SELECT user_id, password FROM users WHERE email = '${userEmail}' OR username = '${userEmail}'`,
    null
  )

  // if data is undefined return an error
  if(typeof data == 'undefined') {
    return { 
      message: "Email or passowrd is incorrect"
    }
  }
  const user_id = data[0]['user_id']
  const db_password = data[0]['password']

  // Check and compare passowrds
  const hashedPassword = await comparePasswords(db_password, password);

  // 4. Create user session
  if(!hashedPassword) {
    return {
      message: "Error on server"
    }
  }
  await createSession(user_id);

  // 5. Redirect user to the profile page
  redirect("/");
}
