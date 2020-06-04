const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  fetchCoordsByIP(ip, (error, coordinates) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    console.log(
      `It worked! Returned Latitude: ${coordinates.latitude}, Longtitude: ${coordinates.longitude}`
    );
    fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }
      console.log("It worked! Returned flyover times:", passTimes);
    });
  });
});
