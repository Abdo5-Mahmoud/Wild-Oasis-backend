import { Router } from "express";
import {
  createCabin,
  deleteCabinById,
  getAllCabins,
  updateCabinById,
  uploadCabinImage,
} from "./services/cabins.service.js";
import { validationMiddleware } from "../../middleware/validation.middleware.js";
import { cabinValidation } from "./cabins.validation.js";
import { uploadCloudfile } from "../../utils/multer/multer.cloud.js";
import { fileValidationTypes } from "../../utils/multer/cloudinary.js";
import { authenticationMiddleware } from "../../middleware/authentication.middleware.js";

export const cabinRouter = Router();

cabinRouter.get("/", authenticationMiddleware(), getAllCabins);
cabinRouter.post(
  "/",
  authenticationMiddleware(),
  validationMiddleware(cabinValidation.createCabin),
  createCabin
);
cabinRouter.put(
  "/:cabinId/uploadImg",
  authenticationMiddleware(),
  uploadCloudfile(fileValidationTypes.image).single("image"),
  uploadCabinImage
);
cabinRouter.put(
  "/:cabinId",
  authenticationMiddleware(),
  validationMiddleware(cabinValidation.updateCabinById),
  updateCabinById
);
cabinRouter.delete(
  "/:cabinId",
  authenticationMiddleware(),
  validationMiddleware(cabinValidation.deleteCabinById),
  deleteCabinById
);
