import { EventEmitter } from "node:events";
import { sendEmail } from "../email/send.email.js";
import { customAlphabet } from "nanoid";
import { verifyAccountTempl } from "../email/template/verifyAccount.temp.js";
import { UserModel } from "../../DB/models/user.model.js";
import * as dbService from "../../DB/db.service.js";
import { generateHash } from "../security/hash.security.js";
export const emailEvent = new EventEmitter();

emailEvent.on("sendConfimrmEmailOtp", async (data) => {
  const { email } = data;
  const code = customAlphabet("1234567890", 4)();
  const html = verifyAccountTempl(code);
  const hashedCode = await generateHash({ plaintText: code });
  const user = await dbService.findOneAndUpdate({
    model: UserModel,
    filter: { email },
    data: {
      confirmEmailOtp: hashedCode,
      otpExp: Date.now() + 1000 * 60 * 2,
    },
    otpions: { new: true },
  });

  await sendEmail({
    to: email,
    subject: "Confirm your email",
    html,
  });
});
