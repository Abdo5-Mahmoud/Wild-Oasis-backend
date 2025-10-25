import { model, models, Schema } from "mongoose";

const settingsSchema = new Schema(
  {
    minBookingLength: {
      type: Number,
      required: true,
    },
    maxBookingLength: {
      type: Number,
      required: true,
    },
    maxGuestsPerBooking: {
      type: Number,
      required: true,
    },
    breakfastPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const SettingsModel =
  models.Settings || model("Settings", settingsSchema);
