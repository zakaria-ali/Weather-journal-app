/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = '2022c3f38d3cf4e0791924781cf47d2d&units=imperial';

// Base URL for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', generateData);

function generateData(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, zip, apiKey)
        .then(function (data) {
            postData('/add', { temperature: data.main.temp, date: newDate, userResponse: feelings });
        })
        .then(function () {
            updateUI();
        });
}

// Async GET to fetch weather data from OpenWeatherMap API
const getWeather = async (baseURL, zip, key) => {
    const res = await fetch(`${baseURL}${zip}&appid=${key}`);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}


// Async POST to send data to server
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

// Async GET to fetch data from the server
const getData = async (url = '') => {
    const response = await fetch(url);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

// Update UI
const updateUI = async () => {
    const request = await getData('/all');
    try {
        document.getElementById('date').innerHTML = `Date: ${request.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${request.temperature} degrees`;
        document.getElementById('content').innerHTML = `Feeling: ${request.userResponse}`;
    } catch (error) {
        console.log("error", error);
    }
}
