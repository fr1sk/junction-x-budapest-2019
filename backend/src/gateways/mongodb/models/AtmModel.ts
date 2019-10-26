import mongoose, { Schema, Document } from 'mongoose';
import { Atm } from 'domain/entities';

const AtmSchema = new Schema({
  STREET_ADDRESS: String,
  LOCATION: {
    X: Number,
    Y: Number,
  },
  ZIP: Number,
  ATM_DEPOSIT: {
    type: Boolean,
  },
  TRANSACTIONS: {},
  CURRENCY: {

  }
});

type AtmType = Atm & Document;

export default mongoose.model<AtmType>('Atm', AtmSchema);
