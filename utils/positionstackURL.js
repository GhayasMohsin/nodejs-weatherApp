const request = require('request')

//`Longitude is ${response.body.data[0].longitude} and Latitude is ${response.body.data[0].latitude}`

/*PositionStack Api (alternative to the mapbox.com)*/
// const positionStackURL='http://api.positionstack.com/v1/forward?access_key=7d08b57f7e469ca82f1eda53f605bb5c&query=n'

// request({url:positionStackURL,json:true},(error,response)=>{
//     if(error){
//         console.log('No internet connection! Check for the connection')
//     }else if(response.body.data.length===0){
//         console.log('No matching result')
//     }
//     else{
//         console.log(response.body.data)
//         console.log(`Longitude is ${response.body.data[0].longitude} and Latitude is ${response.body.data[0].latitude}`)
//     }
// })

//using destructuring witht he response object as accessing its body {body}

const positionstackURL = (location, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=7d08b57f7e469ca82f1eda53f605bb5c&query=' + location
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Check Your Internet Connection', undefined)
        } else if (response.body.data[0].longitude === undefined && response.body.data[0].latitude === undefined) {
            callback(undefined, 'Location doesnot exist')
        }
        else {
            callback(undefined, {
                longitude: response.body.data[0].longitude,
                latitude: response.body.data[0].latitude,
                location: response.body.data[0].region + ', ' + response.body.data[0].country
            }
            )
        }
    })
}

module.exports = positionstackURL