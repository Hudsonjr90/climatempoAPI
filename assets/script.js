

//Variáveis e seleção de elementos

const apiKey = "383780b96a6afc813c84d99d6d5d47b8";
const apiCountryURL = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x1900/?";

const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const humidityElement = document.querySelector('#umidity span');
const windElement = document.querySelector('#wind span');

const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");

const loader = document.querySelector("#loader");

const suggestionsContainer = document.querySelector("#suggestions");
const suggestionsButtons = document.querySelectorAll("#suggestions button");


//funcoes

const togglerLoader = () => {
    loader.classList.toggle("hide");
}

const getWeatherData = async(city) => {
    togglerLoader();

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    togglerLoader();

    return data;

}


const showErrorMessage = () => {
    errorMessageContainer.classList.remove('hide');
}

const hideInformation = () => {
    errorMessageContainer.classList.add('hide');
    weatherContainer.classList.add('hide');

    suggestionsContainer.classList.add('hide');
}

const showWeatherData = async(city) => {
    hideInformation();

    const data = await getWeatherData(city);

    if(data.cod === "404"){
        showErrorMessage();
        return;
    }

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    //mudar img de background

    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`

    weatherContainer.classList.remove('hide');
};

//eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);

});

    //Para enviar no enter

cityInput.addEventListener("keyup", (e) => { 
    if(e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }
});

suggestionsButtons.forEach((btn) => {

    btn.addEventListener("click", () => {

        const city = btn.getAttribute("id");
        showWeatherData(city);
    })
})