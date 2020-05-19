import * as mongoose from 'mongoose';

export class User extends mongoose.Document {
  email: string;
  password: string;
  role: any;
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
});