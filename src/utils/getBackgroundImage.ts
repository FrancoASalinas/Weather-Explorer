import thunderstorm from 'src/assets/weatherBackgrounds/thunderstorm.jpg';
import rain from 'src/assets/weatherBackgrounds/rain.jpg';
import snow from 'src/assets/weatherBackgrounds/thunderstorm.jpg';
import mist from 'src/assets/weatherBackgrounds/mist.jpg';
import clearSky from 'src/assets/weatherBackgrounds/clear-sky-2.jpg';
import clearSkyNight from 'src/assets/weatherBackgrounds/clear-sky-night.jpg';
import snowNight from 'src/assets/weatherBackgrounds/snow-night.jpg';
import cloudyNight from 'src/assets/weatherBackgrounds/cloudy-night.jpg';
import brokenClouds from 'src/assets/weatherBackgrounds/broken-clouds.jpg';
import cloudy from 'src/assets/weatherBackgrounds/cloudy.jpg';

function getBackgroundImage(weatherCode: number, isDay: boolean) {
  const images = [
    { src: clearSky, matchingIdList: [0, 1], nightSrc: clearSkyNight },
    { src: brokenClouds, matchingIdList: [2], nightSrc: clearSkyNight },
    { src: cloudy, matchingIdList: [3], nightSrc: cloudyNight },
    { src: mist, matchingIdList: [45, 48] },
    { src: rain, matchingIdList: [51, 53, 55, 56, 57] },
    { src: rain, matchingIdList: [61, 63, 65, 66, 67, 80, 81, 82] },
    {
      src: snow,
      matchingIdList: [71, 73, 75, 77, 85, 86],
      nightSrc: snowNight,
    },
    { src: thunderstorm, matchingIdList: [95, 96, 99] },
  ];

  for (let { src, matchingIdList, nightSrc } of images) {
    if (matchingIdList.includes(weatherCode)) {
      return isDay ? src : nightSrc || src;
    }
  }
}

export default getBackgroundImage;
