const axios = require('axios');
const logger = require('../utils/logger');

class WeatherService {
  constructor() {
    this.apiKey = 'bd5e378503939ddaee76f12ad7a97608'; // Using the key provided by the user
    this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  }

  async getKarachiWeather() {
    try {
      logger.info("Fetching live weather data for Karachi...");
      const response = await axios.get(this.baseUrl, {
        params: {
          q: 'Karachi',
          appid: this.apiKey,
          units: 'metric'
        }
      });

      const data = response.data;
      return {
        condition: data.weather[0].main,
        description: data.weather[0].description,
        temp: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        timestamp: new Date().toISOString(),
        isRainy: data.weather[0].main.toLowerCase().includes('rain')
      };
    } catch (error) {
      logger.error(`Weather API Error: ${error.message}`);
      // Fallback to mock data if API fails
      return {
        condition: "Heavy Rain",
        temp: 28,
        humidity: 85,
        isRainy: true,
        timestamp: new Date().toISOString(),
        fallback: true
      };
    }
  }
}

module.exports = new WeatherService();
