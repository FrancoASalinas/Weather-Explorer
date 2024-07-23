import { Layer } from "../types";

 
  const layers: Layer[] = [
    {
      name: 'Temperature',
      urlString: 'temp_new',
      metrics: [-40, -30, -20, -10, 0, 10, 20, 25, 30],
      unit: 'ºC',
      id: 'temp',
    },
    {
      name: 'Clouds',
      urlString: 'clouds_new',
      metrics: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      unit: '%',
      id: 'clouds',
    },
    {
      name: 'Precipitation',
      urlString: 'precipitation_new',
      metrics: [0, 0.1, 0.2, 0.5, 1, 10, 140],
      unit: 'mm',
      id: 'rain',
    },
    {
      name: 'Sea level pressure',
      urlString: 'pressure_new',
      metrics: [94, 96, 98, 100, 101, 102, 104, 106, 108],
      unit: 'Kpa',
      id: 'pressure',
    },
    {
      name: 'Wind speed',
      urlString: 'wind_new',
      metrics: [1, 5, 15, 25, 50, 100, 200],
      unit: 'm/s',
      id: 'wind',
    },
  ];

  export default layers