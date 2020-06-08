import * as mongoose from 'mongoose';
import { Role } from './role.schema';

export class User extends mongoose.Document {
  email: string;
  password: string;
  role: mongoose.Types.ObjectId | Role;
  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
}, { timestamps: true });