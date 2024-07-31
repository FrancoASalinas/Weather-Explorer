const weatherHistoryMock = {
  "latitude": 52.52,
  "longitude": 13.419998,
  "generationtime_ms": 1.09601020812988,
  "utc_offset_seconds": 0,
  "timezone": "GMT",
  "timezone_abbreviation": "GMT",
  "elevation": 38,
  "daily_units": {
    "time": "iso8601",
    "weather_code": "wmo code",
    "temperature_2m_max": "°C",
    "temperature_2m_min": "°C",
    "rain_sum": "mm",
    "showers_sum": "mm",
    "snowfall_sum": "cm",
    "wind_speed_10m_max": "km/h",
    "wind_direction_10m_dominant": "°"
  },
  "daily": {
    "time": [
      "2024-07-22",
      "2024-07-23",
      "2024-07-24",
      "2024-07-25",
      "2024-07-26",
      "2024-07-27",
      "2024-07-28",
      "2024-07-29"
    ],
    "weather_code": [61, 80, 80, 3, 61, 63, 95, 3],
    "temperature_2m_max": [22.9, 27.3, 23.9, 22.7, 24.2, 23.4, 22.4, 23.2],
    "temperature_2m_min": [16.7, 13.7, 16.2, 12.2, 14.3, 17.6, 15.7, 12.9],
    "rain_sum": [0, 0.5, 4.1, 0, 0.2, 13.8, 15.4, 0],
    "showers_sum": [0, 0, 0.5, 0, 0, 0.1, 0.3, 0],
    "snowfall_sum": [0, 0, 0, 0, 0, 0, 0, 0],
    "wind_speed_10m_max": [18.4, 12.9, 16.1, 11.2, 12.1, 6.8, 19.3, 14.3],
    "wind_direction_10m_dominant": [280, 213, 298, 285, 175, 131, 310, 307]
  }
};

export default weatherHistoryMock;
