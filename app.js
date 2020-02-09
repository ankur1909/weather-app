const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const location = process.argv[2];
if(location) {
    geocode(location, (error,data) => {
        if(error) {
            console.log(error);
        } else {
            forecast(data, (error,data) => {
                if(error) {
                    console.log(error);
                } else {
                    console.log(data);
                }
            });
        }
    });
}
else {
    console.log('Enter a location to search weather.')
}