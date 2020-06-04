/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require("request");

const fetchMyIP = function (callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    const ip = JSON.parse(body).ip;
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      callback(null, ip);
    }
  });
};

const fetchCoordsByIP = function (ip, callback) {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    const data = JSON.parse(body);
    const { latitude, longitude } = JSON.parse(body).data;
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(
        Error(
          `Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`
        ),
        null
      );
      return;
    } else {
      callback(null, { latitude, longitude });
    }
  });
};

const fetchISSFlyOverTimes = function (coordinates, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coordinates.latitude}&lon=${coordinates.longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(
        Error(
          `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`
        ),
        null
      );
      return;
    }
    const data = JSON.parse(body).response;
    callback(null, data);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
