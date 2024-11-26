"use client";

import { login } from "./action";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [state, action, pending] = useFormState(login, undefined);
  let [showLoading, isLoading] = useState<boolean>(false);
  let [showMessage, getMessage] = useState<boolean>(false);

  useEffect(() => {
    // È in load fino al ritorno del dato
    if (state) {
      isLoading(false);
    }

    // Gestione box errori
    if (state?.message) {
      getMessage(true);
    }
  }, [state]);

  return (
    <div className="bg-white selection:bg-black selection:text-white">
      <div className="flex min-h-screen flex-1 flex-col px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-900">
            Sign in to PieToken
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div
            className={`text-red-500 bg-red-200 border border-red-300 rounded-md mb-5 px-4 py-3 hidden ${
              showMessage && "!block"
            }`}
          >
            <div className="flex justify-between select-none">
              {state?.message}{" "}
              <span
                onClick={() => getMessage(false)}
                className="cursor-pointer"
              >
                x
              </span>
            </div>
          </div>

          <form
            encType="multipart/form-datas"
            action={action}
            onSubmit={() => isLoading(true)}
            method="POST"
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="userEmail"
                className="block text-sm font-medium leading-6 text-neutral-900"
              >
                Username or email address
              </label>
              <div className="mt-2">
                <input
                  id="userEmail"
                  name="userEmail"
                  type="text"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 outline-none p-4 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-neutral-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-green-600 hover:text-green-500">
                      Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 outline-none p-4 transition-all"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Sign in
                <svg
                  className={`animate-spin mx-3 h-5 w-5 text-white hidden ${
                    showLoading && "!block"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-neutral-500">
            Not a member?{" "}
            <a
              href={"/signup"}
              className="font-semibold leading-6 text-green-600 hover:text-green-500"
            >
              Create now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
