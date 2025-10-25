import { asynHandler } from "../../../utils/res/error.res.js";
import * as dbServices from "../../../DB/db.service.js";
import { compareHash } from "../../../utils/security/hash.security.js";
import { generateToken } from "../../../utils/security/token.security.js";
import { successRes } from "../../../utils/res/success.res.js";
import { CabinModel } from "../../../DB/models/cabin.model.js";
import { cloud } from "../../../utils/multer/cloudinary.js";

export const getAllCabins = asynHandler(async (req, res, next) => {
  const cabins = dbServices.findAll({
    model: CabinModel,
    filter: {
      isDeleted: false,
    },
  });

  if (!Object.keys(cabins).length)
    return next(new Error("No cabins found", { cause: 404 }));

  return successRes({
    res,
    status: 200,
    message: "Cabins retrieved successfully",
    data: cabins,
  });
});

export const createCabin = asynHandler(async (req, res, next) => {
  const cabinData = req.body;
  const cabin = await dbServices.create({ model: CabinModel, data: cabinData });

  return successRes({
    res,
    status: 201,
    message: "Cabin created successfully",
  });
});

export const uploadCabinImage = asynHandler(async (req, res, next) => {
  const { cabinId } = req.params;
  const file = req.file;

  if (!file) return next(new Error("Image file is required", { cause: 400 }));

  const cabin = await dbServices.findOne({
    model: CabinModel,
    filter: { _id: cabinId },
  });
  if (!cabin) return next(new Error("Cabin not found", { cause: 404 }));

  try {
    const { secure_url, public_id } = await (
      await cloud()
    ).uploader.upload(file.path, {
      folder: `Cabins/${cabinId}`,
    });

    await dbServices.findByIdAndUpdate({
      model: CabinModel,
      id: cabinId,
      data: { image: { secure_url, public_id } },
    });

    return successRes({
      res,
      status: 201,
      message: "Cabin image uploaded successfully",
    });
  } catch (err) {
    console.log(err);

    return next(new Error("Failed to upload image", { cause: 500 }));
  }
});

export const updateCabinById = asynHandler(async (req, res, next) => {
  try {
    const { cabinId } = req.params;
    const cabinData = req.body;

    const cabin = await dbServices.findByIdAndUpdate({
      model: CabinModel,
      id: cabinId,
      data: cabinData,
      options: { new: true },
    });

    if (!cabin) return next(new Error("Cabin not found", { cause: 404 }));

    return successRes({
      res,
      status: 200,
      message: "Cabin updated successfully",
      data: cabin,
    });
  } catch (err) {
    return next(new Error("Failed to update cabin", { cause: 500 }));
  }
});

export const deleteCabinById = asynHandler(async (req, res, next) => {
  try {
    const { cabinId } = req.params;

    const cabin = await dbServices.findByIdAndUpdate({
      model: CabinModel,
      id: cabinId,
      data: { isDeleted: true },
      options: { new: true },
    });

    if (!cabin) return next(new Error("Cabin not found", { cause: 404 }));
    return successRes({
      res,
      status: 200,
      message: "Cabin deleted successfully",
    });
  } catch (err) {
    return next(new Error("Failed to delete cabin", { cause: 500 }));
  }
});
