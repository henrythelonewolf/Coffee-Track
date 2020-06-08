import * as mongoose from 'mongoose';
import { Coffee } from './coffee.schema';
import { Brew } from './brew.schema';
import { User } from './user.schema';

export class Recipe extends mongoose.Document {
  coffee: mongoose.Types.ObjectId | Coffee;
  waterAmount: number;
  coffeeAmount: number;
  ratio: number; // g/L
  brewMethod: mongoose.Types.ObjectId | Brew;
  rating: number;
  tasteNotes: string[];
  remarks: string;
  createdBy: mongoose.Types.ObjectId | User;
  updatedBy: mongoose.Types.ObjectId | User;
  createdAt: Date;
  updatedAt: Date;
}

export const RecipeSchema = new mongoose.Schema({
  coffee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coffee',
    required: true
  },
  waterAmount: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  coffeeAmount: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  ratio: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  brewMethod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brew',
    required: true
  },
  rating: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  tasteNotes: [{
    type: mongoose.Schema.Types.String,
  }],
  remarks: {
    type: mongoose.Schema.Types.String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, {timestamps: true})