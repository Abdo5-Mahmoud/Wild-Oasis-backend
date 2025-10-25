export const successRes = ({
  res,
  data = {},
  message = "Success",
  statusCode = 200,
}) => {
  return res.status(statusCode).json({
    message,
    data,
  });
};
