import thunderstorm from '../assets/thunderstorm.jpg';
import rain from '../assets/rain.jpg';
import snow from '../assets/thunderstorm.jpg';
import mist from '../assets/mist.jpg';
import dust from '../assets/dust.jpg';
import haze from '../assets/haze.jpg';
import clearSky from '../assets/clear-sky-2.jpg';
import clearSkyNight from '../assets/clear-sky-night.jpg';
import snowNight from '../assets/snow-night.jpg';
import cloudyNight from '../assets/cloudy-night.jpg';
import brokenClouds from '../assets/broken-clouds.jpg';
import cloudy from '../assets/cloudy.jpg';
import { WeatherData } from '../types';

function getBackgroundImage(weather: WeatherData['weather']) {
  const id = weather[0].id.toString();
  const isNight = weather[0].icon.includes('n');
  const images = [
    { src: thunderstorm, matchingId: '2' },
    { src: rain, matchingId: '5' },
    { src: rain, matchingId: '3' },
    { src: snow, matchingId: '6' },
    { src: mist, matchingId: '7' },
    { src: dust, matchingId: '731' },
    { src: haze, matchingId: '721' },
    { src: clearSky, matchingId: '8' },
    { src: brokenClouds, matchingId: '803' },
    { src: cloudy, matchingId: '804' },
    { src: clearSkyNight, matchingId: 'n8' },
    { src: snowNight, matchingId: 'n6' },
    { src: cloudyNight, matchingId: 'n804' },
  ];

  const map = new Map<string, string>();

  for (const image of images) {
    map.set(image.matchingId, image.src);
  }

  const matchingImage = isNight
    ? map.get(`n${id}`) || map.get(`n${id[0]}`)
    : map.get(id) || map.get(`${id[0]}`);

  return matchingImage ? matchingImage : undefined;
}

export default getBackgroundImage;
