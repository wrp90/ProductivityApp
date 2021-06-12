import moment from 'moment';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

function WeatherApp() {
    var currentDate = moment().format('MMM Do YYYY');
    var API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    console.log(API_KEY)
    var cities = JSON.parse(localStorage.getItem('cities')) || [];
    var userInput = document.querySelector("#search-input");


    $("#search-input").keyup(function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $("#searchBtn").click();
        }
    });

    function searchBtn() {
        var QUERY = $("#search-input").val().trim();
        getWeather(QUERY);
        $("#search-input").attr("placeholder", "Enter another city");
        cities.unshift(QUERY);
        localStorage.setItem("cities", JSON.stringify(cities))

        renderButons();
    };

    function getWeather(QUERY) {
        var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";
        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?";
        var fiveDayForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
        var unitsURL = "&units=imperial";

        saveSearch(QUERY);

        $(".date").text(currentDate);


        $.ajax({
            url: weatherURL + QUERY + unitsURL + "&appid=" + API_KEY,
            method: "GET"
        })
            //will grab current weather info and display it on the webpage
            .then(function (currentRes) {
                console.log(currentRes)
                $("#location").html(localStorage.getItem('city'))
                $("#location").html(currentRes.location);
                $("#temp").html(Math.floor(currentRes.main.temp));
                $("#wind").html(currentRes.wind.speed + " mph");
                $("#humidity").html(currentRes.main.humidity + " %")

                var iconPath = currentRes.weather[0].icon;
                var iconURL = "https://openweathermap.org/img/wn/" + iconPath + "@2x.png";
                //previous icon issues was due to url showing https instead of http - this will show icon of weather description 
                $("#description").html("<img src='" + iconURL + "'>");

                $.ajax({
                    url: uvURL + formatUVQuery(currentRes.coord.lon, currentRes.coord.lat) + "&appid=" + API_KEY,
                    method: "GET"
                })

                    .then(function (uvRes) {
                        var uvValue = uvRes.value;
                        var uvIndex = document.querySelector("#uvIndex");
                        uvIndex.textContent = uvValue;

                        if (uvValue > 11) {
                            uvIndex.style.backgroundColor = "purple";
                        }
                        else if (uvValue > 8) {
                            uvIndex.style.backgroundColor = "red";
                        }
                        else if (uvValue > 6) {
                            uvIndex.style.backgroundColor = "orange"
                        }
                        else if (uvValue > 3) {
                            uvIndex.style.backgroundColor = "yellow";
                            uvIndex.style.color = "black";
                        }
                        else {
                            uvIndex.style.backgroundColor = "green"
                        };
                    })
            })

        $.ajax({
            url: fiveDayForecastURL + QUERY + unitsURL + "&appid=" + API_KEY,
            method: "GET"
        })
            //will grab fiveday weather info and display it on the webpage
            .then(function (forecastRes) {
                //DAY 1
                var dateOne = moment().add(1, 'days').format('MMM Do YYYY');
                //shows date
                $("#date1").html(dateOne);
                //shows temp for said date
                $("#temp1").html(Math.floor(forecastRes.list[0].main.temp));
                //shows humidity for said date 
                $("#humid1").html(forecastRes.list[0].main.humidity);
                //shows description ie clear skys etc since i was not able to get the icons to appear on webpage
                var iconPath1 = forecastRes.list[0].weather[0].icon;
                var iconURL = "https://openweathermap.org/img/wn/" + iconPath1 + "@2x.png";
                //previous icon issues was due to url showing https instead of http - this will show icon of weather description 
                $("#description1").html("<img src='" + iconURL + "'>");

                //DAY 2
                var dateTwo = moment().add(2, 'days').format('MMM Do YYYY');
                $("#date2").html(dateTwo);
                $("#temp2").html(Math.floor(forecastRes.list[9].main.temp));
                $("#humid2").html(forecastRes.list[9].main.humidity);
                var iconPath2 = forecastRes.list[9].weather[0].icon;
                var iconURL = "https://openweathermap.org/img/wn/" + iconPath2 + "@2x.png";
                $("#description2").html("<img src='" + iconURL + "'>");

                //DAY 3
                var dateThree = moment().add(3, 'days').format('MMM Do YYYY');
                $("#date3").html(dateThree);
                $("#temp3").html(Math.floor(forecastRes.list[17].main.temp));
                $("#humid3").html(forecastRes.list[17].main.humidity);
                var iconPath3 = forecastRes.list[17].weather[0].icon;
                var iconURL = "https://openweathermap.org/img/wn/" + iconPath3 + "@2x.png";
                $("#description3").html("<img src='" + iconURL + "'>");

                //DAY 4
                var dateFour = moment().add(4, 'days').format('MMM Do YYYY');
                $("#date4").html(dateFour);
                $("#temp4").html(Math.floor(forecastRes.list[25].main.temp));
                $("#humid4").html(forecastRes.list[25].main.humidity);
                var iconPath4 = forecastRes.list[25].weather[0].icon;
                var iconURL = "https://openweathermap.org/img/wn/" + iconPath4 + "@2x.png";
                $("#description4").html("<img src='" + iconURL + "'>");

                //DAY 5
                var dateFive = moment().add(5, 'days').format('MMM Do YYYY');
                $("#date5").html(dateFive);
                $("#temp5").html(Math.floor(forecastRes.list[33].main.temp));
                $("#humid5").html(forecastRes.list[33].main.humidity);
                var iconPath5 = forecastRes.list[33].weather[0].icon;
                var iconURL = "https://openweathermap.org/img/wn/" + iconPath5 + "@2x.png";
                $("#description5").html("<img src='" + iconURL + "'>");
            })
    }

    function saveSearch(city) {
        localStorage.setItem('city', city);
    }

    //will clear list and local storage
    function clearBtn() {
        window.localStorage.clear()
        $("#city-list").empty();
        $("#search-input").empty()
    };

    $("#city-list").on("click", ".searches", function () {
        var queryBtn = $(this).text();
        getWeather(queryBtn);
        saveSearch(queryBtn);
    })

    function renderButons() {
        $("#city-list").empty();
        //adds cities to list and will only show the 5 most recent cities 
        for (let i = 0; i < cities.length; i++) {
            let newCity = $("<button></button>").append(cities[i])
            $("#city-list").append(newCity);
            cities = cities.slice(0, 5);
        }

        $("#search-input").val("");
    };

    function formatUVQuery(lon, lat) {
        return "&lon=" + lon + "&lat=" + lat
    }

    return (
        <div style={{backgroundColor:'lightblue', height: '121vh'}}>
            <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                    <div className="input-group mb-3">
                        <input id="search-input" type="city" name="city" className="form-control"
                            placeholder="Please enter a city" aria-describedby="basic-addon2"></input>
                        <div className="input-group-append">
                            <button onClick={searchBtn} className="btn btn-dark" type="button">Search</button>
                        </div>
                    </div>
                </div>
            <div className="row mb-2">
                <div className="col-8 weather mx-auto">
                    <div className="weather-head">
                        <h1 id="h1"><span id="location"></span></h1>
                        <div className="row">
                            <div className="col-6">
                                <span id="description"></span>
                            </div>
                            <div id="temperature" className="col-6">
                                <h1 id="h1"><span id="temp"></span>°</h1>
                            </div>
                        </div>

                    </div>
                    <div className="weather-body">
                        <div className="row">
                            <div className="humidity col-4">
                                Humidity
                        </div>
                            <div className="wind col-4">
                                Wind Speed
                        </div>
                            <div className="uvIndex col-4">
                                UV Index
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        <div id="humidity" className="humidity-data col-4">
                            <span id="humid"></span>
                        </div>
                        <div id="wind" className="wind-data col-4">
                            <span id='wind'></span>
                        </div>
                        <div id="uvIndex" className="degree-data col-4">
                            <p className="rounded border border-danger bg-danger text-white"><span id="uvIndex"></span></p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="card-title">
                <h1 id="h1">Five Day Forecast</h1>
            </div>
            <div className="card-deck">
                <div className="row">
                    <div className="col-4">
                        <div id="date1">Date1</div>
                        <div className="card-body">
                            <div id="description1"></div>
                            <span id="icon-desc" id="icon1" ></span>
                            <p id="desc"><span id="temp1"></span>°</p>
                            <p className="card-text">Humidity <span id="humid1"></span>%</p>
                        </div>
                    </div>
                    <div className="col-4">
                        <div id="date2">Date2</div>
                        <div className="card-body">
                            <div id="description2"></div>
                            <span id="icon-desc" id="icon2" ></span>
                            <p id="desc"><span id="temp2"></span>°</p>
                            <p className="card-text">Humidity <span id="humid2"></span>%</p>
                        </div>
                    </div>

                    <div className="col-4">
                        <div id="date3">Date3</div>
                        <div className="card-body">
                            <div id="description3"></div>
                            <span id="icon-desc" id="icon3" ></span>
                            <p id="desc"><span id="temp3"></span>°</p>
                            <p className="card-text">Humidity <span id="humid3"></span>%</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div id="date4">Date4</div>
                        <div className="card-body">
                            <div id="description4"></div>
                            <span id="icon-desc" id="icon4" ></span>
                            <p id="desc"><span id="temp4"></span>°</p>
                            <p className="card-text">Humidity <span id="humid4"></span>%</p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div id="date5">Date5</div>
                        <div className="card-body">
                            <div id="description5"></div>
                            <span id="icon-desc" id="icon5" ></span>
                            <p id="desc"><span id="temp5"></span>°</p>
                            <p className="card-text">Humidity <span id="humid5"></span>%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
