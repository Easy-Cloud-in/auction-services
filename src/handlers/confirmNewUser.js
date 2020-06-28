import AWS from "aws-sdk";
import commonMiddleware from "../lib/commoMiddleware";
import createError from "http-errors";

const cognito = new AWS.CognitoIdentityServiceProvider();
const clientId = process.env.CLIENT_ID;

async function confirmNewUser(event, context) {
  const { email, confirmationCode } = event.body;
  const params = {
    ClientId: clientId,
    Username: email,
    ConfirmationCode: confirmationCode,
  };

  let result;
  try {
    result = await cognito.confirmSignUp(params).promise();
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(result),
  };
}

export const handler = commonMiddleware(confirmNewUser);
