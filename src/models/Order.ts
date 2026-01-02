import { Schema, model, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IOrder extends Document {
  id: string;
  specs: { key: string; value: any }[];
  name: string;
  surname: string;
  email: string;
  copies: string;
  phone: string;
  company: string;
  comments: string;
  fileUrl: string;
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
  id: { type: String, default: uuidv4 },
  specs: { type: Array, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  copies: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String, required: false },
  comments: { type: String, required: false },
  fileUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Order = model<IOrder>("Order", orderSchema);
