$(document).ready(function () {
    $("#listWeather").hide();
    $.ajax({
        type: "GET",
        dataType: "JSONP",
        url: "http://ip-api.com/json",
        success: function (objData) {
            let lat = objData.lat,
                lon = objData.lon,
                key = "8f2d15c180d86446029d769affd3ab94";
            $.ajax({
                type: "GET",
                dataType: "JSONP",
                url: `https://api.darksky.net/forecast/${key}/${lat},${lon}`,
                success: function (data) {
                    console.log(data.currently);
                    $("#skyData").html(data.currently.summary);
                    $("#temperature").html("Current temperature : " + data.currently.temperature);
                    $("#humidity").html("Humidity : " + data.currently.humidity);
                    $("#windSpeed").html("Wind Speed : " + data.currently.windSpeed);
                    $("#pressure").html("Pressure : " + data.currently.pressure);
                    $("#listWeather").show();
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