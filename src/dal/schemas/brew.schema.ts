import * as mongoose from 'mongoose';
import { User } from './user.schema';

export class Brew extends mongoose.Document {
  name: string;
  description: string;
  createdAt: Date;
  createdBy: mongoose.Types.ObjectId | User;
  updatedAt: Date;
  updatedBy: mongoose.Types.ObjectId | User;
}

export const BrewSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
    trim: true
  },
  description: {
    type: mongoose.Schema.Types.String,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true})