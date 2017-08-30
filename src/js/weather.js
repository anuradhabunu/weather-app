/* Function to handle on eneter to the search bar*/
function handle(e) {
        var city = document.getElementById("searchTxt").value;
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=5372dab24a061820454dedd6b8306cb0";
        var weatherID;
        var searchDiv = document.getElementById("search-div");
        if (e.keyCode == 13) {
          var getJSON = function(url,callback) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET",url,true);
            //JSON Parcing not required,Below line decides type of response
            xhr.responseType = "json";
            xhr.onload = function() {
              var status = xhr.status;
              if(xhr.readyState == 4) {
                if(status == 200) {
                  //callback(null,xhr.response);
                  response = xhr.response;
                  weatherID = response.weather[0].id;
                  searchDiv.style.top = "24%";
                  backImg(weatherID,response);
                  tempDetails(response);
                } else {
                  callback(status,xhr.response);
                }
              }
            };
            xhr.send(null);
          };
          getJSON(url,function(err,data) {
            if(err != null) {
              alert("Error occured :" + err);
            } else {
              alert("Query Count :" + data.query.count);
            }
          });
        }
}
function backImg(weatherID,response) {
    var weatherIcon = response.weather[0].icon;
    var temp_c = response.main.temp;
    var temp_f = Math.round(((temp_c*9)/5 + 32)*100)/100;
    var weatherDesc = response.weather[0].description;
    var temperature = temp_c + " &#176C / " + temp_f + " &#176F " ;
    if(weatherID >= 200 & weatherID < 300) {
      setDisplayProperties('thunderstorm', '#fff', temperature, weatherIcon, 'thunderstorm', weatherDesc);
    } else if (weatherID >= 300 & weatherID < 400) {
      setDisplayProperties('drizzle', '#49034e', temperature, weatherIcon, 'light rain', weatherDesc);
    } else if (weatherID >= 500 & weatherID < 600) {
      setDisplayProperties('rain', '#faf1a5', temperature, weatherIcon, 'rain', weatherDesc);
    } else if (weatherID >= 600 & weatherID < 700) {
      setDisplayProperties('snow', '#49034e', temperature, weatherIcon, 'snowy', weatherDesc);
    } else if (weatherID >= 700 & weatherID < 800) {
      setDisplayProperties('hazy', '#2c3438', temperature, weatherIcon, 'hazy', weatherDesc);
    } else if (weatherID == 800) {
      setDisplayProperties('clear', '#691c00', temperature, weatherIcon, 'clear sky', weatherDesc);
    } else if (weatherID >= 801 & weatherID < 900) {
      setDisplayProperties('clouds', '#4d0f0f', temperature, weatherIcon, 'cloudy', weatherDesc);
    } else if (weatherID >= 900 & weatherID < 910) {
      setDisplayProperties('extreme', '#49034e', temperature, weatherIcon, 'extreme weather', weatherDesc);
    } else if (weatherID >= 950 & weatherID < 963) {
      setDisplayProperties('additional', '#49034e', temperature, weatherIcon, 'broken clouds', weatherDesc);
    }
} 

function setDisplayProperties(imgName, textColor, temperature, weatherIcon, iconAltText, weatherDesc) {
  var imgDisplay = document.getElementById("bkImg");
  var dispcolor = document.getElementById("disp");
  var weatherTemperature = document.getElementById("temp");
  imgDisplay.src = './src/img/' + imgName + '.jpg';
  dispcolor.style.color = textColor;
  weatherTemperature.innerHTML =  temperature + '<img src = \'http://openweathermap.org/img/w/' + weatherIcon + '.png\' alt = \'' + iconAltText + '\' style = \'position : relative ; top:14px;\'>    ' + weatherDesc ;
}

function tempDetails(response) {
     var weatherLoc = document.getElementById("loc");
     var weatherHumid = document.getElementById("humid");
     var weatherWind = document.getElementById("wind");
     var weatherDate = document.getElementById("date");
     var city = response.name;
     var country = response.sys.country;
     var humidity = response.main.humidity;
     var windSpeed = response.wind.speed;
     var date = new Date();
     var weatherType = response.weather[0].description;
     var dateDisplay = date.toDateString() + " " + date.toLocaleTimeString() + " " + date.toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2]; 
     weatherLoc.innerHTML =  city + ", " + country;
     weatherHumid.innerHTML =  "Humidity: " + humidity + "%";
     weatherDate.innerHTML = dateDisplay;
     weatherWind.innerHTML =  "Wind Speed: " + windSpeed + "m/s"
}
function initialize() {
  var options = { types: ['(cities)'] };
  var input = document.getElementById('searchTxt');
  var autocomplete = new google.maps.places.Autocomplete(input, options);
}
google.maps.event.addDomListener(window, 'load', initialize);
