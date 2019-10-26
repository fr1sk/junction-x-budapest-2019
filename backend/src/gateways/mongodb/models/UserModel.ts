import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  balance: {
    type: String,
  },
  currency: {
    type: String,
  },
});

export default mongoose.model('User', UserSchema);
