import { JWTPayload } from "./types";
import jwt from "jsonwebtoken";

/**
 * Signs an object and returns a JWT token
 *
 * @param payload
 * @param options
 * @returns string
 */
const signJWT = <T>(
	payload: JWTPayload<T>,
	options?: jwt.SignOptions | undefined,
) => {
	const opts = options || {};
	return jwt.sign(payload.data || {}, payload.key, {
		...opts,
		algorithm: "RS256",
	});
};

/**
 * Verifies if the given token is valid or not
 * @param token
 * @param key
 * @returns
 */
const verifyJWT = <T>(token: string, key: string): T | null => {
	try {
		const decoded = jwt.verify(token, key);
		return decoded as T;
	} catch (error) {
		return null;
	}
};

export { signJWT, verifyJWT };
