import mongoose, { Schema, Document } from 'mongoose';
import { Atm } from 'domain/entities';

const AtmSchema = new Schema({
  location: {
    type: String,
  },
  deposit: {
    type: Boolean,
  },
  balance: {
    type: Number,
  },
  currencies: [{
    type: String,
  }],
});

type AtmType = Atm & Document;

export default mongoose.model<AtmType>('Atm', AtmSchema);
