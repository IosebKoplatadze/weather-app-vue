import * as axios from 'axios';
import { API_ENDPOINT, OPENWEATHERMAP_KEY } from './config';

export const getCityWeather = async city => {
  try {
    const response = await axios.get(
      `${API_ENDPOINT}/weather?q=${city}&units=metric&appid=${OPENWEATHERMAP_KEY}`,
    );
    const data = parseResponse(response);
    return parseData(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getDetailedCityWeather = async city => {
  try {
    const response = await axios.get(
      `${API_ENDPOINT}/forecast/daily?q=${city}&cnt=16&units=metric&appid=${OPENWEATHERMAP_KEY}`,
    );
    const data = parseResponse(response);
    console.log('TCL: data', data);
    return parseData(data);
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

const parseData = data => {
  return (
    data && {
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      name: data.name,
    }
  );
};
