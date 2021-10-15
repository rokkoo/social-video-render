/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IHttpResponse<T> {
	data: T;
	status: number;
	statusText: string;
	headers: Record<string, string>;
	request?: any;
}

export interface IHttpError {
	status: number;
	code: string;
	message: string;
}
