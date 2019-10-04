import * as axios from 'axios';
import { API_ENDPOINT, OPENWEATHERMAP_KEY } from './config';
import { groupBy } from 'lodash';
import { format } from 'date-fns';

export const getCityWeather = async city => {
  try {
    const response = await axios.get(
      `${API_ENDPOINT}/weather?q=${city}&units=metric&appid=${OPENWEATHERMAP_KEY}`,
    );
    const data = parseResponse(response);
    return { ...parseWeatherData(data), name: data.name };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCityForecast = async city => {
  try {
    const response = await axios.get(
      `${API_ENDPOINT}/forecast?q=${city}&units=metric&appid=${OPENWEATHERMAP_KEY}`,
    );
    const data = parseResponse(response);
    console.log('TCL: data', data);
    return parseForecastData(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const parseResponse = response => {
  if (response.status !== 200) throw Error(response.message);
  let { data } = response;
  if (typeof data !== 'object') {
    data = undefined;
  }
  console.log('TCL: data', data);
  return data;
};

const parseWeatherData = data => {
  return (
    data && {
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    }
  );
};
const parseForecastData = data => {
  if (data) {
    const parsedList = data.list.map(item => ({
      dateTime: item.dt_txt,
      ...parseWeatherData(item),
    }));

    const days = groupBy(parsedList, item =>
      format(new Date(item.dateTime), 'dd MMMM'),
    );
    console.log('TCL: days', days);
    data = { name: data.city.name, days };
  }
  return data;
};
