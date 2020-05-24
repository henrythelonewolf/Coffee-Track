import * as mongoose from 'mongoose';
import { User } from './user.schema';

export class CoffeeProvider extends mongoose.Document {
  name: string;
  lat: number;
  long: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: mongoose.Types.ObjectId | User;
  updatedBy: mongoose.Types.ObjectId | User;
}

export const CoffeeProviderSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
    trim: true
  },
  lat: {
    type: mongoose.Schema.Types.Number,
  },
  long: {
    type: mongoose.Schema.Types.Number,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true});