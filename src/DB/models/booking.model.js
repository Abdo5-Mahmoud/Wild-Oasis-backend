import mongoose from "mongoose";
const { Schema, model, models, Types } = mongoose;
const bookingSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    cabinId: {
      type: Types.ObjectId,
      ref: "Cabin",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    numNights: {
      type: Number,
      required: true,
    },
    numGuests: {
      type: Number,
      required: true,
    },
    cabinPrice: {
      type: Number,
      required: true,
    },
    extrasPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    hasBreakfast: {
      type: Boolean,
      default: false,
    },
    isPaid: {
      type: Boolean,
      required: true,
    },
    observations: {
      type: String,
    },
    isDeleted: Boolean,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const BookingModel = models.Booking || model("Booking", bookingSchema);
