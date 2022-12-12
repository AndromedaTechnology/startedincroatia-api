import mongoose, { Schema } from "mongoose";

export class LinkDto {
  _id?: mongoose.Types.ObjectId;
  name?: string;
  description?: string;
  href?: string;
  avatar_url?: string;
  favicon_url?: string;
  createdAt?: Date;
}

const linkSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  href: {
    type: String,
    required: true,
  },
  avatar_url: {
    type: String,
    required: false,
  },
  favicon_url: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const linkModel = mongoose.model("Link", linkSchema);

export default linkModel;
