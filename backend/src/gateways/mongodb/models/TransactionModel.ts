import mongoose, { Schema, Document } from 'mongoose';
import { Transaction } from 'domain/entities';

const TransactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  atm: {
    type: Schema.Types.ObjectId,
    ref: 'Atm',
  },
  type: String,
  amount: Number,
  qr_code: String,
});

type TransactionType = Transaction & Document;

export default mongoose.model<TransactionType>('Transaction', TransactionSchema);
