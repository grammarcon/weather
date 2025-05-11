const API_KEY = '576a63ff0ce5460bab350212241410';
const API_URL = 'https://api.weatherapi.com/v1/current.json';

// 날씨 상태에 따른 아이콘 매핑
const weatherIcons = {
    'Sunny': 'fa-sun',
    'Clear': 'fa-sun',
    'Partly cloudy': 'fa-cloud-sun',
    'Cloudy': 'fa-cloud',
    'Overcast': 'fa-cloud',
    'Mist': 'fa-smog',
    'Patchy rain possible': 'fa-cloud-rain',
    'Patchy snow possible': 'fa-snowflake',
    'Patchy sleet possible': 'fa-snowflake',
    'Patchy freezing drizzle possible': 'fa-snowflake',
    'Thundery outbreaks possible': 'fa-bolt',
    'Blowing snow': 'fa-snowflake',
    'Blizzard': 'fa-snowflake',
    'Fog': 'fa-smog',
    'Freezing fog': 'fa-smog',
    'Patchy light drizzle': 'fa-cloud-rain',
    'Light drizzle': 'fa-cloud-rain',
    'Freezing drizzle': 'fa-snowflake',
    'Heavy freezing drizzle': 'fa-snowflake',
    'Patchy light rain': 'fa-cloud-rain',
    'Light rain': 'fa-cloud-rain',
    'Moderate rain at times': 'fa-cloud-showers-heavy',
    'Moderate rain': 'fa-cloud-showers-heavy',
    'Heavy rain at times': 'fa-cloud-showers-heavy',
    'Heavy rain': 'fa-cloud-showers-heavy',
    'Light freezing rain': 'fa-snowflake',
    'Moderate or heavy freezing rain': 'fa-snowflake',
    'Light sleet': 'fa-snowflake',
    'Moderate or heavy sleet': 'fa-snowflake',
    'Patchy light snow': 'fa-snowflake',
    'Light snow': 'fa-snowflake',
    'Patchy moderate snow': 'fa-snowflake',
    'Moderate snow': 'fa-snowflake',
    'Patchy heavy snow': 'fa-snowflake',
    'Heavy snow': 'fa-snowflake',
    'Ice pellets': 'fa-snowflake',
    'Light rain shower': 'fa-cloud-rain',
    'Moderate or heavy rain shower': 'fa-cloud-showers-heavy',
    'Torrential rain shower': 'fa-cloud-showers-heavy',
    'Light sleet showers': 'fa-snowflake',
    'Moderate or heavy sleet showers': 'fa-snowflake',
    'Light snow showers': 'fa-snowflake',
    'Moderate or heavy snow showers': 'fa-snowflake',
    'Light showers of ice pellets': 'fa-snowflake',
    'Moderate or heavy showers of ice pellets': 'fa-snowflake',
    'Patchy light rain with thunder': 'fa-bolt',
    'Moderate or heavy rain with thunder': 'fa-bolt',
    'Patchy light snow with thunder': 'fa-bolt',
    'Moderate or heavy snow with thunder': 'fa-bolt'
};

function getWeatherIcon(condition) {
    return weatherIcons[condition] || 'fa-cloud';
}

async function searchWeather() {
    const cityInput = document.getElementById('cityInput');
    const weatherInfo = document.getElementById('weatherInfo');
    const city = cityInput.value.trim();

    if (!city) {
        weatherInfo.innerHTML = '<p class="error-message">도시 이름을 입력해주세요.</p>';
        return;
    }

    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}&aqi=no`);
        const data = await response.json();

        if (response.ok) {
            const weather = data.current;
            const location = data.location;
            const weatherIcon = getWeatherIcon(weather.condition.text);

            weatherInfo.innerHTML = `
                <div class="weather-card">
                    <h2>
                        <i class="fas ${weatherIcon}"></i>
                        ${location.name}, ${location.country}
                    </h2>
                    <p><i class="fas fa-clock"></i> 현재 시간: ${location.localtime}</p>
                    <p><i class="fas fa-temperature-high"></i> 기온: ${weather.temp_c}°C</p>
                    <p><i class="fas fa-thermometer-half"></i> 체감 온도: ${weather.feelslike_c}°C</p>
                    <p><i class="fas fa-tint"></i> 습도: ${weather.humidity}%</p>
                    <p><i class="fas fa-cloud"></i> 날씨 상태: ${weather.condition.text}</p>
                    <p><i class="fas fa-wind"></i> 풍속: ${weather.wind_kph} km/h</p>
                </div>
            `;
        } else {
            weatherInfo.innerHTML = '<p class="error-message">도시를 찾을 수 없습니다. 다시 시도해주세요.</p>';
        }
    } catch (error) {
        weatherInfo.innerHTML = '<p class="error-message">날씨 정보를 가져오는 중 오류가 발생했습니다.</p>';
        console.error('Error:', error);
    }
}

// Enter 키로도 검색 가능하도록 설정
document.getElementById('cityInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchWeather();
    }
});
