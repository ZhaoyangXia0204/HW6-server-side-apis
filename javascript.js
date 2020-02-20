$(document).ready(function () {
    var history = JSON.parse(localStorage.getItem("history")) || [];

    function gethistory() {
        var history = JSON.parse(localStorage.getItem("history")) || [];

        if (history.length > 0) {
            weather(history[history.length - 1]);
        }
        for (var i = 0; i < history.length; i++) {
            searchHistory(history[i]);
        }
    }
    gethistory();


    function searchHistory(text) {
        var listItem = $("<li>").addClass("list-group-item").text(text);
        $(".history").append(listItem);
    }

    $(".history").on("click", "li", function () {
        weather($(this).text());

    });
    function weatherFuture(searchCity) {
        var searchCity = $("#searchCity").val();

        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&APPID=47fa82b62ef20633030e8379f62f4e90",

        }).then(function (future) {
            console.log(future)

            var fiveDayArray = future.list.filter(function(weatherObj) {
                if (weatherObj.dt_txt.includes('6:00:00')) {
                    return true
                } else {
                    return false
                }
            })

            console.log(fiveDayArray)


            for(i=0; i <5; i++){
                var titleS = $("<p>").addClass("card-title font-weight-bold").text(fiveDayArray[i].dt_txt);
                var cardS = $("<div>").addClass("card col-xl-2");
                var cardBodyS = $("<div>").addClass("card-body");
                var humidS = $("<p>").addClass("card-text").text("Humidity: " + fiveDayArray[i].main.humidity + "%");
                var tempS = $("<p>").addClass("card-text").text("Temperature: " + fiveDayArray[i].main.temp + " °k");
            

            


            cardBodyS.append(titleS, tempS, humidS);
            cardS.append(cardBodyS);
            $(".futureweather").append(cardS);
            }
        });
    }


    $("#submit").on("click", function () {
        event.preventDefault();
        var searchCity = $("#input").val();
        $("#input").val("");
        weather(searchCity);
        weatherFuture(searchCity);
    })
    function weather() {
        var searchCity = $("#searchCity").val();
        console.log(searchCity)

        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q="+searchCity+"&appid=47fa82b62ef20633030e8379f62f4e90"
        }).then(function (data) {
                history.push(searchCity);
                localStorage.setItem("history", JSON.stringify(history));
                searchHistory(searchCity);
            $("#today").empty();
            var title = $("<h1>").addClass("card-title").text(data.name + " " + new Date().toLocaleDateString());
            var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

            var card = $("<div>").addClass("card");
            var cardBody = $("<div>").addClass("card-body");
            var temperature = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °k");
            var humidit = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
            var windSpeed = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");

            title.append(img);
            cardBody.append(title, temperature, humidit, windSpeed);
            card.append(cardBody);
            $("#today").append(card);


        })




    }












})