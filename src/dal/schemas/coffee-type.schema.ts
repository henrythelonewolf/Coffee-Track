import * as mongoose from 'mongoose';
import { User } from './user.schema';

export class CoffeeType extends mongoose.Document {
  region: string;
  remarks: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: mongoose.Types.ObjectId | User;
  updatedBy: mongoose.Types.ObjectId | User;
}

export const CoffeeTypeSchema = new mongoose.Schema({
  region: {
    type: mongoose.Schema.Types.String,
    required: true,
    trim: true
  },
  remarks: {
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
}, { timestamps: true });