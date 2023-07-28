import { config } from "dotenv";
config();

import cors from "cors";

import express, { Request, Response } from "express"; // Importing function from express package as well as Request and Response
import mongoose, { ObjectId } from "mongoose";
import Card from "./Models/Card";
import Player from "./Models/Player";

const app = express(); // When we call the function, we get back this app
const PORT = 3001; // Good to always make your ports as constant var

app.use(express.json()); // We use this middleware function that allows us to make json post requests [will always run before our endpoints]
app.use(
  cors({
    origin: "*",
  })
);

/*****************GET REQUESTS*****************/

app.get("/", (req: Request, res: Response) => {
  res.send("hello word");
});

app.get("/cards", async (req: Request, res: Response) => {
  const cards = await Card.find();
  res.json(cards);
});

app.get("/cards/:playerID", async (req: Request, res: Response) => {
  const playerID = req.params.playerID;
  const selectedPlayer = await Player.find({ _id: playerID });
  if (!selectedPlayer) {
    return res.status(404).json({ message: "Player not found" });
  }
  console.log("Raw Data: ", selectedPlayer);
  // Get the cardIDs associated with the player
  const cardIDs = selectedPlayer[0].cardID;

  console.log("Extracted IDs: ", cardIDs);

  // Find all the cards whose _id matches any value in the cardIDs array
  const cards = await Card.find({ _id: { $in: cardIDs } });

  console.log("Card Data: ", cards);

  // If no cards are found for the player, return an empty array
  if (!cards || cards.length === 0) {
    return res.json([]);
  }

  // Return the cards associated with the player as JSON
  res.json(cards);
});

app.get("/players", async (req: Request, res: Response) => {
  const players = await Player.find();
  res.json(players);
});

app.get("/", async (req: Request, res: Response) => {
  const cardID = req.params.cardID;
  console.log(cardID);
  const card = await Card.find({ _id: cardID });
  res.json(card);
});

app.post("/cards", async (req: Request, res: Response) => {
  // post method since we are creating some sort of resource

  const newCard = new Card({
    frontCardImage: req.body.frontCardImage,
    backCardImage: req.body.backCardImage,
    playerName: req.body.playerName,
    year: req.body.year,
    cardSet: req.body.cardSet,
    cardType: req.body.cardType,
    color: req.body.color,
    cardNumber: req.body.cardNumber,
    cardNumberedOutOf: req.body.cardNumberedOutOf,
    dateAcquired: req.body.dateAcquired,

    // the request is a json so we take in the body and then specifically the title part and that will be the new title of our object in the collection
  }); // Normal OOP where we are creating an object that takes in a javascript object with a title since that is in our myModel schema

  const createdCard = await newCard.save(); // Since the save method is a promise then we need to await on it, which makes our function async
  res.json(createdCard);
});

app.post("/players", async (req: Request, res: Response) => {
  // post method since we are creating some sort of resource

  const existingPlayer = await Player.findOne({
    playerName: req.body.playerName,
  });

  if (existingPlayer) {
    // Step 2: Player already exists, update the player's document with the new cardId
    existingPlayer.cardID.push(req.body.cardID); // Assuming newCard is the newly created card document
    await existingPlayer.save();
    res.json(existingPlayer);

    console.log("Player updated:", existingPlayer);
  } else {
    // Step 3: Player doesn't exist, create a new player with the new cardId
    const newPlayer = new Player({
      playerImage: req.body.playerImage,
      playerName: req.body.playerName,
      currTeam: req.body.currTeam,
      cardID: req.body.cardID, // Assuming newCard is the newly created card document
    });
    const createdPlayer = await newPlayer.save();
    res.json(createdPlayer);

    console.log("New player created:", newPlayer);
  }
});

app.delete("/cards/:cardID", async (req: Request, res: Response) => {
  // cardId is a dynamic parameter
  const cardID = req.params.cardID; // grabs the cardID that was in the url/route
  const card = await Card.findByIdAndDelete(cardID); // finds that specific card in our database and then deletes it [returns the card that we deleted]
  res.json(card);
});

mongoose
  .connect(process.env.MONGO_URL!) // this is a promise, which requires a .then that is executed once the action is done
  .then(() => {
    console.log(`Listening on port ${PORT}`);
    app.listen(PORT); // We can tell it to listen on a particular port
  });
