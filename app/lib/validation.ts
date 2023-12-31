import type { ZodError, ZodSchema } from "zod";

type ActionErrors<T> = Partial<Record<keyof T, string>>;

export default async function validateAction<ActionInput>({
  request,
  schema,
}: {
  request: Request;
  schema: ZodSchema;
}) {
  const body = Object.fromEntries(await request.formData());
  try {
    const formData = schema.parse(body) as ActionInput;
    return {
      formData,
      errors: null,
    };
  } catch (error) {
    const e = error as ZodError<ActionInput>;
    return {
      formData: body,
      errors: (e.issues || []).reduce(
        (acc: ActionErrors<ActionInput>, curr) => {
          const key = curr.path[0] as keyof ActionInput;
          acc[key] = curr.message;
          return acc;
        },
        {}
      ),
    };
  }
}
