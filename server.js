"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .get("/cat-message", (req, res) => {
    const message = { author: "cat", text: "Meow" };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/monkey-message", (req, res) => {
    const messages = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];
    const randomMessages = Math.floor(Math.random() * messages.length);
    const message = { author: "monkey", text: messages[randomMessages] };
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/parrot-message", (req, res) => {
    console.log(req.query);
    const message = { author: "parrot", text: req.query.text };
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/bot-message", (req, res) => {
    const userText = req.query.text;

    const commonGreetings = ["hi", "hello", "howdy"];
    const commonGoodbyes = ["bye", "goodbye", "see you", "I'm off"];
    const lowerCaseText = userText.toLowerCase();

    const filteredGreetings = commonGreetings.filter((greeting) => {
      if (lowerCaseText.indexOf(greeting) !== -1) {
        return true;
      }
    });
    const filteredGoodbyes = commonGoodbyes.filter((goodbye) => {
      if (lowerCaseText.indexOf(goodbye) !== -1) {
        return true;
      }
    });

    const getBotMessage = (text) => {
      let botMsg = "";

      if (filteredGreetings.length > 0) {
        botMsg = "Bzzt Hello!";
      } else if (filteredGoodbyes.length > 0) {
        botMsg = "Bzzt Goodbye";
      } else {
        botMsg = `Bzzt ${text}`;
      }

      return botMsg;
    };

    const message = { author: "bot", text: getBotMessage(userText) };
    res.status(200).json({ status: 200, message });
  })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get("/", (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not the page you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
