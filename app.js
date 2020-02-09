const request = require('request');

const urlGeo='https://api.mapbox.com/geocoding/v5/mapbox.places/12what.json?access_token=pk.eyJ1IjoiYW5rdXIxOTA5IiwiYSI6ImNrNmVsdmg4YjBmYjIza3FwemNtYzE0MWkifQ._ZdbPjUEIoogr030OhZbKg'
request({url:urlGeo, json:true}, (error,response,body) => {
    if(error) {
        console.log('Unable to connect to geocoding service.');
    }
    else if (response.body.code===400) {
        console.log('Error occurred from API.');
    }
    else if(body.features.length === 0) {
        console.log('No such place found');
    }
    else {
        const location = body.features[0].center.reverse().join(',');
        const url =`https://api.darksky.net/forecast/d2f421c1ff097bb771aeb1032c04cb77/${location}`;
        request({ url: url, json: true},(error,response,body) => {
            if(error) {
                console.log('Unable to fetch weather from API');
            }
            else if(response.body.code === 400) {
                console.log('Error returned from weather API');
                console.log(body.error);
            }
            else {
                console.log(`${body.daily.data[0].summary} in ${body.timezone}. It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain today. `);
            }
        });
    }
})
