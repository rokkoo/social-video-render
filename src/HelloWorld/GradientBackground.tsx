import {useVideoConfig} from 'remotion';
import {COLOR_1, COLOR_2} from './config';

const GradientBackground: React.FC = () => {
	const config = useVideoConfig();

	return (
		<div
			style={{
				width: config.width,
				height: config.height,
			}}
		>
			<svg viewBox={`0 0 ${config.width} ${config.height}`}>
				<defs>
					<linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="0%">
						<stop offset="0%" stopColor={COLOR_1} />
						<stop offset="100%" stopColor={COLOR_2} />
					</linearGradient>
				</defs>

				<rect
					x={0}
					y={0}
					width={config.width}
					height={config.height}
					fill="url(#gradient)"
				/>
			</svg>
		</div>
	);
};

export default GradientBackground;
