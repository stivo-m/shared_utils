export type JWTPayload<T> = {
	key: string;
	data?: T;
};
