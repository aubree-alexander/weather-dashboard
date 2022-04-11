//dayjs extensions
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

//global variables
var cityName = '';
var apiKey = "a6afda3f25e97c43efdc2ed9326eeba8";
var searchHistory = $("#searchHistory")



//function to fetch coordinates from weather api
function getCoord(city){
    var apiCoordURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + apiKey ;

    fetch(apiCoordURL)
        .then(function(response){
            return response.json();
        })
        //convert latitude and longitude to city name
        .then(function(data){
            var apiForecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=" + apiKey ;
            fetch(apiForecastURL)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    console.log(data)
                    fiveDay(data);
                    getCurrent(city, data);
                })
                .catch(function(err){
                    console.log(err);
                })
        })
}
getCoord();


//get current weather data for city entered 
function getCurrent(city, data) {
    var time = data.current.dt
    var date = dayjs().tz(data.timezone).format('M/D/YYYY')
    var displayWeather = $("#currentDayWeather")
    var weatherColumn = document.createElement('div')
    var weatherCard = document.createElement('div')
    var cityTitle = document.createElement('h2')
    var temp = document.createElement('p')
    var humidity = document.createElement('p')
    var wind = document.createElement('p')
    var uv = document.createElement('p')
    var icon = document.createElement('img')
    weatherColumn.setAttribute('class', 'col-md')
    weatherCard.setAttribute('class', 'card-body float-left')
    icon.setAttribute('src', 'http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@2x.png')
    icon.setAttribute('class', 'iconStyleCurrent')
    cityTitle.innerText = city + " " + date
    temp.innerText = "Temp: " + data.current.temp + " °F"
    humidity.innerText = "Humidity: " + data.current.humidity + "%"
    wind.innerText = "Wind: " + data.current.wind_speed + " MPH"
    uv.innerText = "UV Index: " + data.current.uvi
    displayWeather.append(weatherColumn)
    weatherColumn.append(weatherCard)
    weatherCard.append(cityTitle, icon, temp, humidity, wind, uv)
    
    //display different colors depending on value of uv index
    if (data.current.uvi <= 2) {
        uv.setAttribute('class', 'bg-success')
    } else if (data.current.uvi <=5) {
        uv.setAttribute('class', 'bg-warning')
    } else {
        uv.setAttribute('class', 'bg-danger')
    }
}


//5-day forecast cards, starting at tomorrow's date
function fiveDay(data) {
    var fiveDayDiv = $("#fiveDay")
    var fiveDayCol = document.createElement('div')
    fiveDayCol.setAttribute('class', 'col-12 row')
    fiveDayDiv.append(fiveDayCol)
    

    for (i = 1; i < 6; i++) {
        var cardDate = document.createElement('div')
        cardDate.setAttribute('class', 'card')
        cardDate.textContent = dayjs.unix(data.daily[i].dt).tz(data.timezone).format('M/D/YYYY')
        var cardTemp = document.createElement('p')
        var cardHumidity = document.createElement('p')
        var cardWind = document.createElement('p')
        var icon = document.createElement('img')
        icon.setAttribute('src', 'http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '@2x.png')
        icon.setAttribute('class', 'iconStyle')
        fiveDayCol.append(cardDate)
        var dataTemp = data.daily[0].temp.day
        var dataHumidity = data.daily[0].humidity
        var dataWind = data.daily[0].wind_speed
        cardTemp.innerText = "Temp: " + dataTemp + " °F"
        cardHumidity.innerText = "Humidity: " + dataHumidity + "%"
        cardWind.innerText = "Wind: " + dataWind + " MPH"
    
        //append data to 5-day forecast div
        cardDate.append(icon, cardTemp, cardHumidity, cardWind)
    }
}


// //click event for search button

    $("#searchBtn").click(function() {
        //empty current weather data any time search is clicked
        $("#currentDayWeather").empty();
        $("#fiveDay").empty();
        //empty intro text for inital search
        $("#introText").empty();
        var cityName = $.trim($("#searchBar").val())
        getCoord(cityName)
        var cityNameLi = document.createElement("li")
        cityNameLi.innerText = cityName
        cityNameLi.setAttribute('class', 'historyButtons')
        //stop appending search history once ul length equals 10
        if ($(".historyButtons").length < 10) {
            $("#searchHistory").append(cityNameLi)
            localStorage.setItem('searchHistory', JSON.stringify(cityName))
        }
        //clear form input for next search
        $("#searchBar").val('');
    })



//aubree is to add localstorage function for future (show search history upon refresh)
//aubree is to add ability to click search history list items to re-search 


