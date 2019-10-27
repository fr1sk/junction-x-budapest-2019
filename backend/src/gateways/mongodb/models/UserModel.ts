import mongoose, { Schema, Document } from 'mongoose';
import { User } from 'domain/entities';

const UserSchema = new Schema({
  balance: {
    type: Number,
  },
  currency: {
    type: String,
  },
  is_loggedin: {
    type: Boolean,
    default: false,
  },
});

type UserType = User & Document;

export default mongoose.model<UserType>('User', UserSchema);
