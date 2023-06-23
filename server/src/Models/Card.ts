import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const ObjectID = mongoose.Types.ObjectID

const Card = new Schema({
  title: String,
});

const MyModel = mongoose.model("Card", Card);

export default MyModel;