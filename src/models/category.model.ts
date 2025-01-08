import mongoose, { Schema } from "mongoose";

// Define the interface for CarCategory
export interface ICarCategory  {
  name: string;
  createdBy: mongoose.Schema.Types.ObjectId;
}

// Define the schema for CarCategory model
const carCategorySchema: Schema<ICarCategory> = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);


// Model for CarCategory
const CarCategory = mongoose.model<ICarCategory>("CarCategory", carCategorySchema);

// Exporting Model and Validation Schema
export default CarCategory ;
