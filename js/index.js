
var inputSearch = document.getElementById("search");
var btnSearch = document.getElementById("btnSearch");


// const currentDate = new Date();
// let date = d.getDate();
// document.getElementById("date").innerHTML = date;



function todayDate() {

    let date = new Date(allinfo.location.localtime)

    document.getElementById("today").innerHTML = date.toLocaleDateString('en-US', { weekday: 'long' });
    document.getElementById("date").innerHTML = date.toLocaleDateString('en-US', { month: 'long' });

}

function tomorrowDate() {

    var date = new Date(allinfo.forecast.forecastday[1].date)
    document.getElementById("tomorrow").innerHTML = date.toLocaleDateString('en-US', { weekday: 'long' });


}

function aftertomorrowDate() {
    var date = new Date(allinfo.forecast.forecastday[2].date)
    document.getElementById("aftertomorrow").innerHTML = date.toLocaleDateString('en-US', { weekday: 'long' });
}

weather('cairo');
inputSearch.addEventListener('input', function () {
    if (inputSearch.value.length > 2) {

        weather(inputSearch.value);
    }
});

let liveLocation;
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
        liveLocation = position.coords.latitude + ',' + position.coords.longitude
        
        weather(liveLocation)
        })
}


// inputSearch.addEventListener('input', function (e) {
//   if(e.target.value.length > 2 ){

//    weather(e.target.value);
//   }
// });

var city = inputSearch.value;

var allinfo = []
async function weather(city) {

    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c91e861f60694e2e834221907240310&q=${city}&days=3`)
    var data = await response.json();
    allinfo = data;
    displayDataDay1();
    displayDataDay2();
    displayDataDay3();
    todayDate();
    tomorrowDate();
    aftertomorrowDate();

}

function displayDataDay1() {
    document.getElementById("city").innerHTML = allinfo.location.name
    document.getElementById("temperature").innerHTML = `${allinfo.current.temp_c}<sup>o</sup>C`
    document.getElementById("img").innerHTML = ` <img  src="http:${allinfo.current.condition.icon}" alt="">`
    document.getElementById("sunny").innerHTML = allinfo.current.condition.text;
    document.getElementById("span1").innerHTML = `<i class="fa-solid fa-umbrella text-secondary fa-lg"></i> ${allinfo.current.precip_mm}%`;
    document.getElementById("span2").innerHTML = `<i class="fa-solid fa-wind text-secondary fa-lg"></i> ${allinfo.current.wind_kph}km/h`;
    document.getElementById("span3").innerHTML = `<i class="fa-regular fa-compass text-secondary fa-lg"></i> ${allinfo.current.wind_dir}`;
}



function displayDataDay2() {
    document.getElementById("img2").innerHTML = ` <img class="" src="http:${allinfo.forecast.forecastday[1].day.condition.icon}" alt="">`
    document.getElementById("maxTemperature").innerHTML = ` ${allinfo.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C`
    document.getElementById("minTemperature").innerHTML = ` ${allinfo.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C`
    document.getElementById("sunny2").innerHTML = ` ${allinfo.forecast.forecastday[1].day.condition.text}`
}

function displayDataDay3() {
    document.getElementById("img3").innerHTML = ` <img class="" src="http:${allinfo.forecast.forecastday[2].day.condition.icon}" alt="">`
    document.getElementById("maxTemperature2").innerHTML = ` ${allinfo.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C`
    document.getElementById("minTemperature2").innerHTML = ` ${allinfo.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C`
    document.getElementById("sunny3").innerHTML = ` ${allinfo.forecast.forecastday[2].day.condition.text}`

}

