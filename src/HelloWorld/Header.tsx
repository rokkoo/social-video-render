import {Img, useVideoConfig} from 'remotion';
import svg from './static/cloudy-day-3.svg';

interface HeaderProps {
	temperature: number;
	weather: string;
}

const Header: React.FC<HeaderProps> = ({temperature, weather}) => {
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
						textShadow: '0px 0px 150px #343a40',
						lineHeight: 0,
					}}
				>
					{temperature.toString().replace('.', ',')}°
				</h1>
				<h1
					style={{
						fontFamily: 'Helvetica, Arial',
						fontSize: 60,
						color: 'white',
						lineHeight: 0,
						fontWeight: 400,
					}}
				>
					{weather}
				</h1>
			</div>
		</div>
	);
};

export default Header;
