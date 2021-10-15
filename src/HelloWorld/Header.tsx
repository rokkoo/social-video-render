import {Img, useVideoConfig} from 'remotion';
import svg from './static/cloudy-day-3.svg';

const Header: React.FC = () => {
	const {width, height} = useVideoConfig();

	return (
		<div
			style={{
				width,
				height: height / 2,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div style={{marginLeft: -60, marginRight: 60}}>
				<Img src={svg} width="500px" />
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<h1
					style={{
						fontFamily: 'Helvetica, Arial',
						fontSize: 140,
						color: 'white',
						textShadow: '2px 3px 120px #4895ef',
						lineHeight: 0,
					}}
				>
					20°
				</h1>
				<h1
					style={{
						fontFamily: 'Helvetica, Arial',
						fontSize: 60,
						color: 'white',
						textShadow: '2px 3px 120px #4895ef',
						lineHeight: 0,
						fontWeight: 100,
					}}
				>
					Clowdy
				</h1>
			</div>
		</div>
	);
};

export default Header;
