import { asynHandler } from "../../../utils/res/error.res.js";
import * as dbServices from "../../../DB/db.service.js";
import { successRes } from "../../../utils/res/success.res.js";
import { BookingModel } from "../../../DB/models/booking.model.js";
import { CabinModel } from "../../../DB/models/cabin.model.js";

export const getAll = asynHandler(async (req, res, next) => {
  const data = req.body;
  const bookings = await dbServices.findAll({
    model: BookingModel,
    filter: { isDeleted: { $ne: true }, ...data },
  });

  return successRes({
    res,
    status: 200,
    message: "Bookings fetched successfully",
    data: { bookings },
  });
});

export const getUserBooking = asynHandler(async (req, res, next) => {
  const { bookingId } = req.params;
  const user = req.user;
  try {
    const booking = await dbServices.findOne({
      model: BookingModel,
      filter: { _id: bookingId, isDeleted: { $ne: true } },
    });
    if (!booking)
      return next(new Error("There is no booking ", { cause: 404 }));

    if (user._id != booking.userId)
      return next(new Error("You are not authorized", { cause: 401 }));
    return successRes({ res, data: booking, message: "Done" });
  } catch (err) {
    return next(
      new Error("There's an error in the getUserBooking function", {
        cause: 400,
      })
    );
  }
});

export const createBooking = asynHandler(async (req, res, next) => {
  const data = req.body;
  data.userId = req.user._id;
  if (new Date(data.startDate) < new Date())
    return next(new Error("please enter valid date", { cause: 400 }));

  const cabin = await dbServices.findOne({
    model: CabinModel,
    filter: { _id: data.cabinId, isDeleted: { $ne: true } },
  });

  if (!cabin) return next(new Error("cabin not found", { cause: 404 }));

  const booking = await dbServices.create({
    model: BookingModel,
    data,
  });
  return successRes({
    res,
    status: 201,
    message: "Booking created successfully",
    data: { booking },
  });
});

export const updateBookingById = asynHandler(async (req, res, next) => {
  const data = req.body;
  const { bookingId } = req.params;
  if (!Object.keys(data).length)
    return next(new Error("There's no data to update", { cause: 400 }));

  const booking = await dbServices.findByIdAndUpdate({
    model: BookingModel,
    id: bookingId,
    data,
    options: { new: true },
  });

  if (!booking) return next(new Error("Booking not found", { cause: 404 }));
  //   console.log(booking);

  return successRes({
    res,
    data: booking,
    message: "Booking updted successfully",
    statusCode: 200,
  });
});

export const deleteBookingById = asynHandler(async (req, res, next) => {
  const { bookingId } = req.params;
  const booking = await dbServices.findByIdAndUpdate({
    model: BookingModel,
    id: bookingId,
    data: { isDeleted: true },
  });

  if (!booking) return next(new Error("Booking not found", { cause: 404 }));

  return successRes({
    res,
    message: "Booking deleted successfully",
    statusCode: 200,
  });
});
