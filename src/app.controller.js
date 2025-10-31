import { connectDb } from "./DB/connectDb.js";
import { authRouter } from "./modules/auth/auth.controller.js";
import { bookingsRouter } from "./modules/booking/booking.controller.js";
import { cabinRouter } from "./modules/cabin/cabins.controller.js";
import { guestRouter } from "./modules/guest/guest.controller.js";
import { globalErrorHandling } from "./utils/res/error.res.js";

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
const corsOptions = {
  origin: "http://localhost:5173/",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const limter = rateLimit({
  limit: 5,
  windowMs: 2 * 60 * 1000,
  message: "Too many request please wait",
});
export function bootStrap({ app, express }) {
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(compression());
  app.use(limter);

  app.use(express.json());

  app.use("/guests", guestRouter);
  app.use("/auth", authRouter);
  app.use("/cabins", cabinRouter);
  app.use("/bookings", bookingsRouter);

  connectDb();

  app.use(globalErrorHandling);
}
