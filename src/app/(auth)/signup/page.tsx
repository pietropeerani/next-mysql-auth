"use client";

import Link from "next/link";
import { signup } from "./action";
import { useFormState } from "react-dom";

export default function SignupPage() {
  const [state, action, pending] = useFormState(signup, undefined);

  return (
    <div className="bg-black">
      <div className="max-w-[996px] h-screen mx-auto px-2 py-20">
        <form
          action={action}
          id="signupForm"
          className="font-mono border border-white bg-neutral-950 border-opacity-25 rounded-md p-6"
        >
          <div className="mb-6 flex gap-2">
            <div className="h-3 aspect-square bg-neutral-600 rounded-full"></div>
            <div className="h-3 aspect-square bg-neutral-600 rounded-full"></div>
            <div className="h-3 aspect-square bg-neutral-600 rounded-full"></div>
          </div>

          <div className="text-neutral-500">
            Welcome by{" "}
            <a
              className="hover:underline"
              href="https://github.com/pietropeerani"
              target="_blank"
            >
              Pietro Peerani
            </a>
            ! <br />
            Copyright (C){" "}
            <a
              className="hover:underline"
              href="https://github.com/pietropeerani"
              target="_blank"
            >
              Pietro Peerani
            </a>
            . Tutti i diritti riservati.
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <div className="flex">
              <div className="whitespace-nowrap text-neutral-400">
                name<span className="text-green-500 mx-2">{">"}</span>
              </div>
              <input
                name="name"
                type="text"
                required
                autoComplete="user"
                className="w-full bg-transparent outline-none border-none text-white"
              />
              {state?.errors?.name && <p>{state.errors.name}</p>}
            </div>

            <div className="flex">
              <div className="whitespace-nowrap text-neutral-400">
                username<span className="text-green-500 mx-2">{">"}</span>
              </div>
              <input
                name="username"
                type="text"
                required
                autoComplete="username"
                className="w-full bg-transparent outline-none border-none text-white"
              />
              {state?.errors?.name && <p>{state.errors.name}</p>}
            </div>

            <div className="flex">
              <div className="whitespace-nowrap text-neutral-400">
                email<span className="text-green-500 mx-2">{">"}</span>
              </div>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full bg-transparent outline-none border-none text-white"
              />
              {state?.errors?.email && <p>{state.errors.email}</p>}
            </div>

            <div className="flex">
              <div className="whitespace-nowrap text-neutral-400">
                password<span className="text-green-500 mx-2">{">"}</span>
              </div>
              <input
                name="password"
                type="password"
                required
                autoComplete="password"
                className="w-full bg-transparent outline-none border-none text-white"
              />
              {state?.errors?.password && (
                <div>
                  <p>Password must:</p>
                  <ul>
                    {state.errors.password.map((error: string) => (
                      <li key={error}>- {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              aria-disabled={pending}
              className="bg-white hover:bg-opacity-75 px-4 py-2 rounded-md block mt-4 text-black transition-all"
            >
              {pending ? "Submitting..." : "Sign up"}
            </button>

            <Link
              href={"/login"}
              className="px-4 py-2 rounded-md block mt-4 text-white text-opacity-60 hover:underline hover:text-opacity-100 transition-all"
            >
              Login
            </Link>
          </div>
        </form>

        {state?.message && (
          <p className="mt-8 font-mono border border-white bg-neutral-950 text-red-600 border-opacity-25 rounded-md p-6">
            {state?.message}
          </p>
        )}

        <div className="mt-20 text-sm flex gap-4 justify-center text-neutral-500">
          <Link href={""} className="hover:underline">
            Terms
          </Link>
          <Link href={""} className="hover:underline">
            Privacy
          </Link>
        </div>
      </div>
    </div>
  );
}
