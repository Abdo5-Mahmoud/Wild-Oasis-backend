import { connect } from "mongoose";

export const connectDb = async () => {
  await connect(process.env.MONGO_URI)
    .then(() => {
      console.log("DB Connected Successfully");
    })
    .catch((err) => {
      console.log("Error with connecting to DB", err);
    });
};
