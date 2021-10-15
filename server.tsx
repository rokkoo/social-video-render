/* eslint-disable @typescript-eslint/ban-ts-comment */

/**
 * This is an example of a server that returns dynamic video.
 * Run `npm run server` to try it out!
 * If you don't want to render videos on a server, you can safely
 * delete this file.
 */

import {bundle} from '@remotion/bundler';
import path from 'path';
import cron from 'node-cron';
import {getCompositions, renderStill} from '@remotion/renderer';

import {getWeater} from './services/weather';
import {instagramLoging, instagramPostFunction} from './services/instagram';

require('dotenv').config();

const init = async () => {
	// data.hourly // hourly weather
	// data.daily[0]; // general info
	// data.daily[0].weather; // general icon
	try {
		const data = await getWeater({lat: 43.339, lon: -1.7894});
		console.log({hours: data.hourly});
		console.log({hours: data.daily[0].weather});
	} catch (error) {
		console.log(error);
	}
};

// init();

const compositionId = 'HelloWorld';

// Every 30s, we'll render a new video.
cron.schedule('*/30 * * * * *', async () => {
	try {
		console.log('Story crooon');

		const params = {
			titleText: 'El tiempo story!',
			titleColor: 'tomato',
			temperature: 23.6,
			weather: 'Rain',
		};

		const bundled = await bundle(path.join(__dirname, './src/index.story.tsx'));
		const comps = await getCompositions(bundled, {inputProps: params});
		const video = comps.find((c) => c.id === compositionId);

		if (!video) {
			throw new Error(`No video called ${compositionId}`);
		}

		const mainImgFolder = `${__dirname}/img/`;
		const finalOutputImg = path.join(mainImgFolder, 'story.jpeg');

		await renderStill({
			composition: video,
			webpackBundle: bundled,
			output: finalOutputImg,
			onError: (error) => {
				console.error(
					'The following error occured when rendering the still: ',
					error.message
				);
			},
			frame: 80,
			inputProps: params,
			imageFormat: 'jpeg',
		});

		console.log({finalOutputImg});
		console.log('Image rendered!');

		await instagramLoging();
		await instagramPostFunction({url: finalOutputImg, type: 'story'});
	} catch (err) {
		console.error(err);
	}
});

// Every 30s, we'll render a new video.
cron.schedule('*/40 * * * * *', async () => {
	try {
		console.log('Feed crooon');

		const params = {
			titleText: 'El tiempo feed!',
			titleColor: 'tomato',
			temperature: 19.6,
			weather: 'Clowdy',
		};

		const bundled = await bundle(path.join(__dirname, './src/index.tsx'));
		const comps = await getCompositions(bundled, {inputProps: params});
		const video = comps.find((c) => c.id === compositionId);

		if (!video) {
			throw new Error(`No video called ${compositionId}`);
		}

		const mainImgFolder = `${__dirname}/img/`;
		const finalOutputImg = path.join(mainImgFolder, 'feed.jpeg');

		await renderStill({
			composition: video,
			webpackBundle: bundled,
			output: finalOutputImg,
			onError: (error) => {
				console.error(
					'The following error occured when rendering the still: ',
					error.message
				);
			},
			frame: 80,
			inputProps: params,
			imageFormat: 'jpeg',
		});

		console.log({finalOutputImg});
		console.log('Image rendered!');

		await instagramLoging();
		await instagramPostFunction({url: finalOutputImg, type: 'feed'});
	} catch (err) {
		console.error(err);
	}
});
