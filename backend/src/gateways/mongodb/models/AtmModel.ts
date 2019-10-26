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
  TRANSACTIONS: {
    FRIDAY: [{
      type: Number,
      required: false,
    }],
    SATURDAY: [{
      type: Number,
      required: false,
    }],
    SUNDAY: [{
      type: Number,
      required: false,
    }],
  },
  CURRENCY: {
    HUF: {
      type: Number,
      required: false,
    },
    EUR: {
      type: Number,
      required: false,
    },
  },
});

type AtmType = Atm & Document;

export default mongoose.model<AtmType>('Atm', AtmSchema);
