import { Document } from 'mongoose';

export interface UrlModel extends Document {
  originalUrl: string;
  shortId: string;
  baseUrl: string;
  visitedCount: number;
}
