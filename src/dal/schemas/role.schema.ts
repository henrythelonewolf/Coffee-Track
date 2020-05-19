import * as mongoose from 'mongoose';

export class Role extends mongoose.Document {
  roleDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

export const RoleSchema = new mongoose.Schema({
  roleDescription: {
    type: mongoose.Schema.Types.String,
    required: true
  }
}, {timestamps: true});