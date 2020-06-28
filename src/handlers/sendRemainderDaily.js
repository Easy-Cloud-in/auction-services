import AWS from "aws-sdk";
// import commonMiddleware from "../lib/commoMiddleware";
// import validator from "@middy/validator";
import createError from "http-errors";
// import { readContentFile } from "../lib/readContentFile";

const SES = new AWS.SES();
// var fs = require("fs");
// const fs = require("fs");

const toAndFromAddress = "sakar.sr@gmail.com";

const htmlBody = `
    <!DOCTYPE html>
    <html>
      <head></head>
      <body><h1>Hello world!</h1></body>
    </html>
  `;

async function sendRemainderDaily(event, context) {
  // let emailHTML;
  // try {
  //   emailHTML = await readContentFile("./html/mail.html");
  //   // emailHTML = await fs.readFileSync("../lib/mail.html", "utf-8");
  // } catch (error) {
  //   console.log("File Not Found!");
  //   throw new createError.NotFound("File Not Found!");
  // }

  const params = {
    Destination: {
      ToAddresses: [toAndFromAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlBody,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Hello from Easy-Cloud.in",
      },
    },
    Source: "sakar from EASY-CLOUD.in <sakar@easy-cloud.in>",
  };

  try {
    await SES.sendEmail(params).promise();
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
}

export const handler = sendRemainderDaily;
