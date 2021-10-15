/* eslint-disable @typescript-eslint/ban-ts-comment */

import fs from 'fs';

// @ts-ignore
import Instagram from 'instagram-web-api';
// @ts-ignore
import FileCookieStore from 'tough-cookie-filestore2';

const cookieStore = new FileCookieStore('./cookies.json');

const client = new Instagram(
	{
		username: process.env.INSTAGRAM_USERNAME,
		password: process.env.INSTAGRAM_PASSWORD,
		cookieStore,
	},
	{
		language: 'es-ES',
	}
);

export const instagramLoging = async () => {
	try {
		await client.login();
		console.log('Logged in');
	} catch (error) {
		console.log('Error logging in:', error);
		console.log('Retrying loging');

		fs.unlinkSync('./cookies.json');
		const newCookieStore = new FileCookieStore('./cookies.json');

		const newClient = new Instagram(
			{
				username: process.env.INSTAGRAM_USERNAME,
				password: process.env.INSTAGRAM_PASSWORD,
				cookieStore: newCookieStore,
			},
			{
				language: 'en-US',
			}
		);

		await newClient.login();
		console.log('Re Logged in');
	}
};

interface InstagramPostFunction {
	url: string;
	type: 'feed' | 'story';
}
export const instagramPostFunction = async ({
	url,
	type,
}: InstagramPostFunction) => {
	try {
		console.log('Uploading to instagram');
		await client.uploadPhoto({
			photo: url, // Upload a photo to Instagram. Only jpeg images allowed.
			caption: 'Tiempo Irun',
			post: type, // feed or story
		});

		console.log('File uploaded!');
	} catch (error) {
		console.log({error});
	}
};
