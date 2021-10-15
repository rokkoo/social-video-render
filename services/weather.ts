import {Http} from '../http';

export const http = new Http();

interface Weather {
	dt: number;
	sunrise: number;
	sunset: number;
	moonset: number;
	moon_phase: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	uvi: number;
	rain: number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	pop: number;
	weather: string;
}

interface WeaterResponse {
	current: Weather;
	hourly: Weather[];
	daily: Weather[];
}

// https://openweathermap.org/api/one-call-api
export const getWeater = async ({
	lat,
	lon,
}: {
	lat: number;
	lon: number;
}): Promise<WeaterResponse> => {
	try {
		const {data: response} = await http.get(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=${process.env.WEATHER_API}`
		);

		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
