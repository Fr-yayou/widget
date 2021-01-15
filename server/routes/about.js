let express = require("express");
const router = express.Router();
let request = require("request");
const http = require("http");

router.get("/about.json", function (req, res) {
  res.status(200).json({
    client: {
      host: req.connection.remoteAddress,
    },
    server: {
      current_time: Date.now(),
      services: [
        {
          name: "TimeAPI",
          widgets: [
            {
              name: "Time",
              description: "Displays current user time",
              params: [
                {
                  name: "format",
                  type: "boolean",
                },
              ],
            },
          ],
        },
        {
          name: "WeatherAPI",
          widgets: [
            {
              name: "Weather widget",
              description: "Displays weather",
              params: [
                {
                  name: "city",
                  type: "string",
                },
              ],
            },
          ],
        },
        {
          name: "RedditAPI",
          widgets: [
            {
              name: "ProgrammerHumor widget",
              description: "Displays latest post(s) from r/ProgrammerHumor",
              params: [
                {
                  name: "single_post_mode",
                  type: "boolean",
                },
              ],
            },
          ],
        },
        {
          name: "SpotifyAPI",
          widgets: [
            {
              name: "Spotify Widget",
              description: "Displays top songs from requested artist",
              params: [
                {
                  name: "artist",
                  type: "string",
                },
              ],
            },
          ],
        },
        {
          name: "DevTo",
          widgets: [
            {
              name: "DevTo posts widget",
              description: "Displays articles related to query",
              params: [
                {
                  name: "keyword",
                  type: "string",
                },
              ],
            },
          ],
        },
        {
          name: "Timer",
          widgets: [
            {
              name: "Timer widget",
              description: "Let's the user set a timer",
              params: [
                {
                  name: "start/stop",
                  type: "boolean",
                },
              ],
            },
          ],
        },
        {
          name: "Jokes on you",
          widgets: [
            {
              name: "Jokes widget",
              description: "Grab some fun for the day",
              params: [
                {
                  name: "not in the mood",
                  type: "boolean",
                },
              ],
            },
          ],
        },
      ],
    },
  });
});

module.exports = router;
