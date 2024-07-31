import descriptions from './descriptions.json'

const jsonDescriptions = JSON.stringify(descriptions);
const weatherDescriptions: {
  [key: string]: {
    day: {
      description: string;
      image: string;
    };
    night: { description: string; image: string };
  };
} = JSON.parse(jsonDescriptions);

export default weatherDescriptions