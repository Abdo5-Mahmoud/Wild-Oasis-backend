import { connectDb } from "./DB/connectDb.js";
import { authRouter } from "./modules/auth/auth.controller.js";
import { bookingsRouter } from "./modules/booking/booking.controller.js";
import { cabinRouter } from "./modules/cabin/cabins.controller.js";
import { guestRouter } from "./modules/guest/guest.controller.js";
import { globalErrorHandling } from "./utils/res/error.res.js";

export function bootStrap({ app, express }) {
  app.use(express.json());

  app.use("/guests", guestRouter);
  app.use("/auth", authRouter);
  app.use("/cabins", cabinRouter);
  app.use("/bookings", bookingsRouter);

  connectDb();

  app.use(globalErrorHandling);
}
