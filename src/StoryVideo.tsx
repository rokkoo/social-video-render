import {Composition} from 'remotion';
import {HelloWorld} from './HelloWorld';
import Header from './HelloWorld/Header';
import BackGround from './HelloWorld/BackGround';
import {Subtitle} from './HelloWorld/Subtitle';
import {Title} from './HelloWorld/Title';

export const RemotionVideo: React.FC = (props) => {
	return (
		<>
			<Composition
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={150}
				fps={30}
				width={1080}
				height={1920}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
				}}
			/>
			<Composition
				id="BackGround"
				component={BackGround}
				durationInFrames={200}
				fps={30}
				width={1080}
				height={1920}
			/>
			<Composition
				id="Header"
				component={Header}
				durationInFrames={100}
				fps={30}
				width={1080}
				height={1920}
				defaultProps={{
					titleText: 'test',
					titleColor: 'black',
				}}
			/>
			<Composition
				id="Title"
				component={Title}
				durationInFrames={100}
				fps={30}
				width={1080}
				height={1920}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
				}}
			/>
			<Composition
				id="Subtitle"
				component={Subtitle}
				durationInFrames={100}
				fps={30}
				width={1080}
				height={1920}
			/>
		</>
	);
};
