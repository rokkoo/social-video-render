/**
 * This is an example of a server that returns dynamic video.
 * Run `npm run server` to try it out!
 * If you don't want to render videos on a server, you can safely
 * delete this file.
 */

import {bundle} from '@remotion/bundler';
import {
	getCompositions,
	renderFrames,
	stitchFramesToVideo,
} from '@remotion/renderer';
import fs from 'fs';
import os from 'os';
import path from 'path';
import cron from 'node-cron';
import {random} from 'remotion';
// @ts-ignore
import Instagram from 'instagram-web-api';
// @ts-ignore
import FileCookieStore from 'tough-cookie-filestore2';

const compositionId = 'HelloWorld';

// Every 30s, we'll render a new video.
cron.schedule('*/30 * * * * *', async () => {
	try {
		console.log('crooon');
		const cookieStore = new FileCookieStore('./cookies.json');

		const client = new Instagram(
			{
				username: process.env.INSTAGRAM_USERNAME,
				password: process.env.INSTAGRAM_PASSWORD,
				cookieStore,
			},
			{
				language: 'en-US',
			}
		);

		const params = {titleText: 'Hello, World', titleColor: 'yellow'};

		const randomColor = '#' + Math.floor(random(null) * 16777215).toString(16);

		console.log('randomColor', randomColor);

		params.titleColor = randomColor;

		const bundled = await bundle(path.join(__dirname, './src/index.tsx'));
		const comps = await getCompositions(bundled, {inputProps: params});
		const video = comps.find((c) => c.id === compositionId);

		if (!video) {
			throw new Error(`No video called ${compositionId}`);
		}

		const tmpDir = await fs.promises.mkdtemp(
			path.join(os.tmpdir(), 'remotion-')
		);

		const {assetsInfo} = await renderFrames({
			config: video,
			webpackBundle: bundled,
			onStart: () => console.log('Rendering frames...'),
			onFrameUpdate: (f) => {
				if (f % 10 === 0) {
					console.log(`Rendered frame ${f}`);
				}
			},
			parallelism: null,
			outputDir: tmpDir,
			inputProps: params,
			compositionId,
			imageFormat: 'jpeg',
		});

		const finalOutput = path.join(__dirname, 'out.mp4');

		await stitchFramesToVideo({
			dir: tmpDir,
			force: true,
			fps: video.fps,
			height: video.height,
			width: video.width,
			outputLocation: finalOutput,
			imageFormat: 'jpeg',
			assetsInfo,
		});

		console.log({finalOutput});

		console.log('Video rendered!');

		console.log('Uploading to instagram');

		const instagramPostFunction = async () => {
			await client.upl;
		};

		// Loging on instagram
		await client
			.login()
			.then(() => {
				console.log('Login successful!');
				instagramPostFunction(client);
			})
			.catch(async (err: Error) => {
				console.log('Login failed!');
				console.log(err);

				console.log(
					'Deleting cookies, waiting 2 minutes, then logging in again and setting new cookie store'
				);
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
			});
	} catch (err) {
		console.error(err);
	}
});
