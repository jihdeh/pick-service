import mongoose, { Schema } from 'mongoose';
import { UrlModel } from '../types';

const urlSchema = new Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortId: {
      type: String,
      required: true,
    },
    baseUrl: {
      type: String,
      required: true,
    },
    visitedCount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

export default mongoose.model<UrlModel>('Url', urlSchema);
