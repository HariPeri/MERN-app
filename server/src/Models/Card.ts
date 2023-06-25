import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const ObjectID = mongoose.Types.ObjectID

const Card = new Schema({
  frontCardImage: String,
  backCardImage: String,
  playerName: String,
  title: String,
  year: Number,
  cardSet: String,
  cardType: String,
  color: String,
  cardNumber: String,
  cardNumberedOutOf: String,
  dateAcquired: String
});

const MyModel = mongoose.model("Card", Card);

export default MyModel;