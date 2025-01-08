import mongoose, { Schema, Model } from 'mongoose';

// Define the interface for the Car document (ICar)
export interface ICar {
    registrationNumber: string;
    make: string;
    model: string;
    color: string;
    category: string;
    createdBy: mongoose.Schema.Types.ObjectId
  }
  

// Define the schema for the Car model
const carSchema: Schema<ICar> = new Schema<ICar>(
  {
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

// Create the Car model using the ICar interface
const Car: Model<ICar> = mongoose.model<ICar>('Car', carSchema);

export default Car;
