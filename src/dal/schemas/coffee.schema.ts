import * as mongoose from 'mongoose';
import { CoffeeType } from './coffee-type.schema';
import { CoffeeProvider } from './provider.schema';
import { User } from './user.schema';

export class Coffee extends mongoose.Document {
  coffeeType: mongoose.Types.ObjectId | CoffeeType;
  provider: mongoose.Types.ObjectId | CoffeeProvider;
  boughtDate: Date;
  roastDate: Date;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: mongoose.Types.ObjectId | User;
  updatedBy: mongoose.Types.ObjectId | User;
}

export const CoffeeSchema = new mongoose.Schema({
  coffeeType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CoffeeType',
    required: true
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CoffeeProvider',
    required: true
  },
  weight: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  boughtDate: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
  roastDate: {
    type: mongoose.Schema.Types.Date,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
})