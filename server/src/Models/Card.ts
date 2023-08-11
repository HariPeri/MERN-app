import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectID = mongoose.Types.ObjectID

const Card = new Schema({
  frontCardImage: String,
  backCardImage: String,
  playerName: String,
  year: String,
  cardSet: String,
  cardType: String,
  color: String,
  cardNumber: String,
  cardNumberedOutOf: String,
  dateAcquired: String,
  orientation: String,
});

const MyModel = mongoose.model("Card", Card); // First Card is way that we represent model and second card is the model we are actually referring to

export default MyModel;
