import mongoose from "mongoose";

const { Schema, model, models } = mongoose;
const cabinsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      secure_url: String,
      public_id: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const CabinModel = models.Cabin || model("Cabin", cabinsSchema);
