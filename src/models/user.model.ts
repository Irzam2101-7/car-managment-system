import mongoose, { Schema, Model } from "mongoose";

// TypeScript interface for User
export interface IUser {
  username: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Mongoose schema definition
const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true, // Removes unnecessary spaces
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate email
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

// Mongoose Model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
