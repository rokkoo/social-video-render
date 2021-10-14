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

const compositionId = 'HelloWorld';

// Every 30s, we'll render a new video.
cron.schedule('*/30 * * * * *', async () => {
	try {
		console.log('crooon');
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
	} catch (err) {
		console.error(err);
	}
});
