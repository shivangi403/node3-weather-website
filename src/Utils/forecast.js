const request = require("request")

const forecast = (latitude , longitude , callback) =>{

    const url = "https://api.darksky.net/forecast/279217b4406dc21012c7c2f4e6537107/"+latitude+","+longitude
    request({url : url , json : true},(error , {body}) => {

    if (error){

        callback("Error while connecting weather service", undefined)
    }
    else if(body.error){

        callback("Unable to find location",undefined)

    }
    else{
        const temp = body.currently.temperature
        const ppt = body.currently.precipIntensity
        const dailydata = body.daily.data[0].summary
        const tempH = body.daily.data[0].temperatureHigh
        const tempL = body.daily.data[0].temperatureLow

        callback(undefined, dailydata+" It is currently "+temp+" degrees out,The high today is "+ tempH+" with a low of "+ tempL+". There is a "+ppt+"% chance of rain")
    }

})
}

module.exports = forecast