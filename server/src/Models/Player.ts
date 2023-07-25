import mongoose from "mongoose";

const Schema = mongoose.Schema;

const playerModel = new Schema({
  playerImage: String,
  playerName: String,
  currTeam: String,
  cardID: [Schema.Types.ObjectId],
});

const model = mongoose.model("Player", playerModel);

export default model;
