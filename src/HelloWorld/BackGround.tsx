import {useVideoConfig} from 'remotion';
import GradientBackground from './GradientBackground';

const BackGround: React.FC = () => {
	const videoConfig = useVideoConfig();

	return (
		<div
			style={{
				width: videoConfig.width,
				height: videoConfig.height,
			}}
		>
			<GradientBackground />
		</div>
	);
};

export default BackGround;
