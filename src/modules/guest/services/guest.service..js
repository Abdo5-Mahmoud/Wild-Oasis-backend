import { asynHandler } from "../../../utils/res/error.res.js";
import { successRes } from "../../../utils/res/success.res.js";
import * as dbServices from "../../../DB/db.service.js";
import { UserModel } from "../../../DB/models/user.model.js";
export const getGuests = asynHandler(async (req, res, next) => {
  const { guestId } = req.params;

  const guest = await dbServices.findOne({
    model: UserModel,
    filter: { _id: guestId },
    populate: {
      path: "bookings",
      options: { sort: { startDate: -1 } },
    },
  });

  return successRes({
    res,
    message: "Done",
    statusCode: 200,
    data: {
      id: guest._id,
      name: guest.name,
      email: guest.email,
      role: guest.role,
      bookings: guest.bookings,
    },
  });
});

export const updateGuestProfile = asynHandler(async (req, res, next) => {
  const { guestId } = req.params;
  const data = req.body;
  const guest = await dbServices.findByIdAndUpdate({
    model: UserModel,
    id: guestId,
    data,
    options: { new: true },
    select: "_id name email imgUrl role countryFlag nationalId",
  });

  if (!guest) return next(new Error("Guest not found", { cause: 404 }));

  return successRes({
    res,
    data: guest,
    statusCode: 200,
  });
});

export const deleteGuest = asynHandler(async (req, res, next) => {
  const { guestId } = req.params;
  const guest = await dbServices.findByIdAndUpdate({
    model: UserModel,
    id: guestId,
    data: { isDeleted: new Date() },
    options: { new: true },
  });

  if (!guest) return next(new Error("Guest not found", { cause: 404 }));

  return successRes({
    res,
    message: "Guest have been deleted",
    statusCode: 200,
  });
});
