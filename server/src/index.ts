import {config} from "dotenv"
config()

import cors from 'cors';

import express, {Request, Response} from "express" // Importing function from express package as well as Request and Response
import mongoose from 'mongoose';
import Card from "./Models/Card";
import multer from 'multer'



const app = express() // When we call the function, we get back this app 
const PORT = 3001; // Good to always make your ports as constant var

app.use(express.json()) // We use this middleware function that allows us to make json post requests [will always run before our endpoints]
app.use(cors({
    origin: '*'
}))

app.get('/', (req: Request, res: Response) => {
    res.send("hello word")
}
)

app.get('/cards',async (req: Request, res: Response) => {
    const cards = await Card.find()
    res.json(cards)
})

app.post("/cards", async (req: Request, res: Response) => { // post method since we are creating some sort of resource
    
    const newCard = new Card({
        title: req.body.title,
        playerName: req.body.playerName // the request is a json so we take in the body and then specifically the title part and that will be the new title of our object in the collection
    }); // Normal OOP where we are creating an object that takes in a javascript object with a title since that is in our myModel schema

    const createdCard = await newCard.save(); // Since the save method is a promise then we need to await on it, which makes our function async
    res.json(createdCard)
})

app.delete('/cards/:cardID', async (req: Request, res: Response) => {  // cardId is a dynamic parameter
   const cardID = req.params.cardID // grabs the cardID that was in the url/route 
   const card = await Card.findByIdAndDelete(cardID) // finds that specific card in our database and then deletes it [returns the card that we deleted]
   res.json(card)
})

mongoose
    .connect(process.env.MONGO_URL!) // this is a promise, which requires a .then that is executed once the action is done
        .then(() => {
        console.log(`Listening on port ${PORT}`)
        app.listen(PORT); // We can tell it to listen on a particular port
    })

