/**
 * Maps raw OpenWeatherMap /weather response to frontend shape.
 */
const mapCurrentWeather = (data) => ({
  city: data.name,
  country: data.sys.country,
  coordinates: {
    lat: data.coord.lat,
    lon: data.coord.lon,
  },
  temperature: {
    current: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    min: Math.round(data.main.temp_min),
    max: Math.round(data.main.temp_max),
  },
  weather: {
    conditionId: data.weather[0].id,
    description: data.weather[0].description,
    main: data.weather[0].main,
    icon: data.weather[0].icon,
    iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  },
  wind: {
    speed: data.wind.speed,
    direction: data.wind.deg ?? null,
  },
  humidity: data.main.humidity,
  pressure: data.main.pressure,
  visibility: data.visibility ?? null,
  sunrise: data.sys.sunrise,
  sunset: data.sys.sunset,
  timezone: data.timezone,
  recordedAt: new Date(data.dt * 1000).toISOString(),
});

/**
 * Maps a single forecast list item from /forecast response.
 */
const mapForecastItem = (item) => ({
  datetime: item.dt_txt,
  timestamp: item.dt,
  temperature: {
    current: Math.round(item.main.temp),
    feelsLike: Math.round(item.main.feels_like),
    min: Math.round(item.main.temp_min),
    max: Math.round(item.main.temp_max),
  },
  weather: {
    description: item.weather[0].description,
    main: item.weather[0].main,
    icon: item.weather[0].icon,
    iconUrl: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
  },
  wind: {
    speed: item.wind.speed,
    direction: item.wind.deg ?? null,
  },
  humidity: item.main.humidity,
  pressure: item.main.pressure,
  precipitation: item.pop ? Math.round(item.pop * 100) : 0,
});

/**
 * Maps full /forecast response — groups items by date for daily summary.
 */
const mapForecast = (data) => {
  const items = data.list.map(mapForecastItem);

  const dailyMap = {};
  items.forEach((item) => {
    const date = item.datetime.split(' ')[0];
    if (!dailyMap[date]) dailyMap[date] = [];
    dailyMap[date].push(item);
  });

  const daily = Object.entries(dailyMap).map(([date, entries]) => ({
    date,
    tempMin: Math.min(...entries.map((e) => e.temperature.min)),
    tempMax: Math.max(...entries.map((e) => e.temperature.max)),
    description: entries[Math.floor(entries.length / 2)].weather.description,
    icon: entries[Math.floor(entries.length / 2)].weather.icon,
    iconUrl: entries[Math.floor(entries.length / 2)].weather.iconUrl,
    entries,
  }));

  return {
    city: data.city.name,
    country: data.city.country,
    timezone: data.city.timezone,
    daily,
  };
};

/**
 * Maps a single location result from Geocoding API.
 */
const mapLocation = (loc) => ({
  name: loc.name,
  country: loc.country,
  state: loc.state ?? null,
  coordinates: {
    lat: loc.lat,
    lon: loc.lon,
  },
  localNames: loc.local_names ?? null,
});

module.exports = { mapCurrentWeather, mapForecast, mapLocation };
