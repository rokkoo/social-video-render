/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import {IHttpResponse} from './types';

const http = axios.create();

export class Http {
	get(url: string): Promise<IHttpResponse<any>> {
		return http.get(url);
	}

	post(url: string, data: any): Promise<IHttpResponse<any>> {
		return http.post(url, data);
	}
}
