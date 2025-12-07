import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: String,
  timing: String,
  items: [String],
  image: String,
});

export default mongoose.model("Service", serviceSchema);
