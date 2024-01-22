import bcrypt from "bcrypt";

/**
 * Returns a boolean value indicating whether passwords match
 * @param plain
 * @param hashed
 * @returns
 */
export const comparePasswords = async (
	plain: string,
	hashed: string,
): Promise<boolean> => {
	const result = await bcrypt.compare(plain, hashed);
	return result;
};

/**
 * Returns a hashed version of the password
 * @param password
 * @returns
 */
export const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hashSync(password, salt);
};

/**
 * Given an array of keys, the function will exclude these keys
 * from the given object.
 * @param object
 * @param keys
 * @returns
 */
export const excludeKeysFromObject = <T>(object: T, ...keys: [keyof T]) => {
	for (let key of keys) {
		delete object[key];
	}
	return object;
};
