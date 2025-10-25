import multer from "multer";

export const uploadCloudfile = (fileValidation = []) => {
  //
  function fileFilter(req, file, cb) {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    if (!fileValidation.length || fileValidation?.includes(file.mimetype)) {
      // To accept this file pass `true`, like so:
      cb(null, true);
    } else {
      // You can always pass an error if something goes wrong:
      cb(
        new Error("invalid file type only jpeg and png is allowed", {
          cause: 400,
        }),
        false
      );
    }
  }
  return multer({ dest: "dest", fileFilter });
};
