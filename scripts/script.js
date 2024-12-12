document.addEventListener("DOMContentLoaded", function () {
    // Array of background images
    const images = [
        'https://glscanada.ca/wp-content/uploads/2018/10/landscaping-and-snow-removal.jpg',
        'https://www.deere.ca/assets/images/region-4/products/attachments/attachments-and-implements/utiilty-tractor-attachments-accessories/snow-removal/snow-removal-hero-image-1366x347.jpg',
        'https://www.agsod.com/wp-content/uploads/2018/04/lawn-mower.jpg',
    ];

    let currentImageIndex = 0;

    function changeBackgroundImage() {
        const banner = document.getElementById('banner');
        banner.style.backgroundImage = `url(${images[currentImageIndex]})`;
    }

    setInterval(function () {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        changeBackgroundImage();
    }, 5000);

    async function getWeather() {
        // Fetch weather data from OpenWeatherMap
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=Calgary&units=metric&appid=3a1ba2d3599c3b58909655829043a9b2`)
        .then(response => response.json())
        .then(data => {
        // Extract relevant data from the response
            const temperature = data.main.temp;
            const weatherCondition = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const icon = data.weather[0].icon;
            const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

        // Display the data in the weather-info section
        const weatherInfo = `
            <p><strong>Temperature:</strong> ${temperature}°C 
            <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon" /></p>
            <p><strong>Condition:</strong> ${weatherCondition}</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
            <p><strong>Sunrise:</strong> ${sunrise}</p>
            <p><strong>Sunset:</strong> ${sunset}</p>
        `;
        
            // Inject the weather information into the HTML
            document.getElementById('weather-info').innerHTML = weatherInfo;
             })
        .catch(error => {
            console.error("Error fetching the weather data: ", error);
            document.getElementById('weather-info').innerHTML = "Unable to fetch weather data.";
    });
    }
    // Call the function to get the weather on page load
    getWeather();

});
