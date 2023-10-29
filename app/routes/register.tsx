import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  type ActionFunctionArgs,
  type MetaFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import validateAction from "~/lib/validation";
import UserRegistration, {
  userRegistrationSchema,
} from "~/services/register-user";
import type { UserRegistrationInput } from "~/services/register-user";

export const meta: MetaFunction = () => {
  return [
    { title: "Register New User" },
    { name: "description", content: "user registration for inboice" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const schema = userRegistrationSchema;
  let { formData, errors } = await validateAction<UserRegistrationInput>({
    request,
    schema,
  });

  if (formData.password !== formData.repeat_password) {
    if (errors?.repeat_password) {
      [errors?.repeat_password, "repeat pasword must match with password"].join(
        ", "
      );
    } else {
      errors = {
        repeat_password: "repeat pasword doesn't match with password",
      };
    }
  }

  if (errors) {
    return json(errors, { status: 400 });
  } else {
    if (formData.name === "") {
      formData.name = formData.email.toString().split("@")[0];
    }
    try {
      await UserRegistration(formData);
      return redirect("/dashboard");
    } catch (error) {
      const e = error as PrismaClientKnownRequestError;
      if (e.code === "P2002") {
        return json(
          {
            email: "Email already taken",
          },
          { status: 400 }
        );
      } else {
        console.log(e);
        return json({ common: e }, { status: 400 });
      }
    }
  }
}

export default function Index() {
  const actionData = useActionData<typeof action>();

  return (
    <main className="wrapper page-container">
      <div className="my-14">
        <div className="">
          <div className="mt-2 mb-6 text-left">
            <h1 className="block font-bold text-slate-800 text-3xl">
              Register An Account
            </h1>
          </div>
          <Form method="post">
            <label
              htmlFor="email"
              className="text-slate-600 text-sm font-medium"
            >
              Email Address
            </label>
            <Input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
            />
            {actionData?.email ? (
              <div className="pt-2 text-sm text-red-500">
                <em>{actionData?.email}</em>
              </div>
            ) : null}
            <br />
            <label
              htmlFor="name"
              className="text-slate-600 text-sm font-medium"
            >
              Username
            </label>
            <Input
              type="name"
              name="name"
              id="name"
              placeholder="Enter your name"
            />
            <br />
            <label
              htmlFor="password"
              className="text-slate-600 text-sm font-medium"
            >
              Password
            </label>
            <Input
              required
              name="password"
              type="password"
              id="password"
              placeholder="Enter your password"
            />
            {actionData?.password ? (
              <div className="pt-2 text-sm text-red-500">
                <em>{actionData?.password}</em>
              </div>
            ) : null}
            <br />
            <label
              htmlFor="repeat_password"
              className="text-slate-600 text-sm font-medium"
            >
              Repeat Password
            </label>
            <Input
              name="repeat_password"
              required
              type="password"
              id="repeat_password"
              placeholder="Repeat type your password"
            />
            {actionData?.repeat_password ? (
              <div className="pt-2 text-sm text-red-500">
                <em>{actionData?.repeat_password}</em>
              </div>
            ) : null}
            <br />
            <Button className="mt-7" type="submit">
              Register
            </Button>
          </Form>
        </div>
      </div>
    </main>
  );
}
