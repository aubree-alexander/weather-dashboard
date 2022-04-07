var cityName = '';
var apiKey = "d91f911bcf2c0f925fb6535547a5ddc9";
//"a6afda3f25e97c43efdc2ed9326eeba8";


// "http://api.openweathermap.org/geo/1.0/direct?q=edison&limit=5&appid=a6afda3f25e97c43efdc2ed9326eeba8"



function getCoord(city){
    var apiCoordURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + apiKey ;

    fetch(apiCoordURL)
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            console.log(data);
            console.log(data[0])
            console.log(data[0].state)

            //document.getElementById("test").innerHTML = data[0].state;
            $("#test").html(data[0].state);
        })
        .catch(function(err){
            console.log(err);
        })
}

getCoord("edison");

//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}


// Step 2. create form input box using HTML and CSS or CSS framework
// Step 3. create fetch function to the weather API to return data about current and future weather conditions
    // Step 3.5. Include data about city name, date, weather condition icon (fontAwesome?) temp, humidity, wind speed, UV index
// Step 4. create function to save search data to localStorage
// Step 5. create function to append search history to page
    // Step 5.5 use JQuery to turn search history into clickable buttons that return data
// Step 6. create if statement to determine UV index value and color code accordingly
 


// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city