import { z } from "zod";

export type FieldError<T> = {
	[K in keyof T]: string[];
};

export type ActionState<TInput, TOutput> = {
	field_errors?: FieldError<TInput>;
	message?: string | null;
	data?: TOutput;
};

/**
 * This function takes in necessary parameters and automatically validates
 * the input based on the given schema.
 * @param schema
 * @param handler
 * @returns
 */
export const createServerAction = <TInput, TOutput>(
	schema: z.Schema<TInput>,
	handler: (data: TInput) => Promise<ActionState<TInput, TOutput>>,
) => {
	return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
		const validationResult = schema.safeParse(data);

		if (!validationResult.success) {
			return {
				field_errors: validationResult.error.flatten()
					.fieldErrors as FieldError<TInput>,
			};
		}

		return handler(validationResult.data);
	};
};

/**
 * Verifies if the action state response has an error
 * @param payload
 * @returns
 */
export const actionStateHasErrors = <TInput, TOutput>(
	payload: ActionState<TInput, TOutput>,
): boolean => {
	/**
	 * If there is no data on the payload, we assume that there is an error
	 */
	if (payload.data == null || payload.data == undefined) {
		return true;
	}

	/**
	 * When there are field errors, we assume that there is an error as well
	 */
	if (payload.field_errors == null || payload.field_errors == undefined) {
		return true;
	}

	return false;
};
