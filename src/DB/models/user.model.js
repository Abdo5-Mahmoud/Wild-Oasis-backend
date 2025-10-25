import mongoose from "mongoose";
import { generateHash } from "../../utils/security/hash.security.js";
import { BookingModel } from "./booking.model.js";
const { model, models, Schema } = mongoose;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    countryFlag: {
      type: String,
      required: true,
    },
    nationalId: {
      type: String,
      required: true,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    isDeleted: Date,

    confirmEmailOtp: String,
    otpExp: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  try {
    // console.log(this.password);

    if (this.isModified("password")) {
      this.password = await generateHash({ plainText: this.password });
    }
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.virtual("bookings", {
  ref: BookingModel,
  localField: "_id",
  foreignField: "userId",
  justOne: false,
});

export const UserModel = models.User || model("User", userSchema);
