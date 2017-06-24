$(document).ready(function () {
    $("#listWeather").hide();
    $("#jumbotron").hide();
    var skycons = new Skycons({ "color": "black" });
    $.ajax({
        type: "GET",
        dataType: "JSONP",
        url: "http://ip-api.com/json",
        success: function (objData) {
            let lat = objData.lat,
                lon = objData.lon,
                key = "8f2d15c180d86446029d769affd3ab94",
                isp = objData.isp,
                country = objData.country,
                city = objData.city;
            console.log(objData);
            $.ajax({
                type: "GET",
                dataType: "JSONP",
                url: `https://api.darksky.net/forecast/${key}/${lat},${lon}`,
                success: function (data) {
                    console.log(data.currently);
                    $("#isp").html("Your are served by : " + isp);
                    $("#place").html(city + " ," + country);
                    $("#skyData").html(data.currently.summary);
                    $("#temperature").html("Current temperature : " + data.currently.temperature);
                    $("#humidity").html("Humidity : " + data.currently.humidity);
                    $("#windSpeed").html("Wind Speed : " + data.currently.windSpeed);
                    $("#pressure").html("Pressure : " + data.currently.pressure);
                    let iconType = data.currently.icon;
                    let mainIcon = iconType.toUpperCase();
                    let weatherIcon = document.getElementById("weatherIcon");
                    console.log(mainIcon);
                    switch (mainIcon) {
                        case "RAIN": skycons.add("weatherIcon", Skycons.RAIN);
                        case "PARTLY-CLOUDY-DAY": skycons.add("weatherIcon", Skycons.CLOUDY);
                        case "PARTLY-CLOUDY-NIGHT": skycons.add("weatherIcon", Skycons.SLEET);
                        case "CLEAR-NIGHT": skycons.add("weatherIcon", Skycons.CLOUDY);
                        case "SNOW": skycons.add("weatherIcon", Skycons.SNOW);
                        case "WIND": skycons.add("weatherIcon", Skycons.WIND);
                        case "FOG": skycons.add("weatherIcon", Skycons.FOG);
                        case "CLOUDY": skycons.add("weatherIcon", Skycons.CLOUDY);
                        case "SLEET": skycons.add("weatherIcon", Skycons.SLEET);
                        case "CLEAR-DAY": skycons.add("weatherIcon", Skycons.WIND);
                    }
                    $("#jumbotron").slideDown();
                    $("#listWeather").slideDown();
                    skycons.play();
                },
                error: function (error) {
                    jsonValue = jQuery.parseJSON(error.responseText);
                    alert("error" + error.responseText);
                }
            });
        },
        error: function (errObj) {
            jsonValue = jQuery.parseJSON(errObj.responseText);
            alert("error" + errObj.responseText);
        }
    });
});