import AWS from "aws-sdk";
import commonMiddleware from "../lib/commoMiddleware";
import createError from "http-errors";

const cognito = new AWS.CognitoIdentityServiceProvider();
const clientId = process.env.CLIENT_ID;

async function createNewUser(event, context) {
  const { userName, email, password } = event.body;
  const params = {
    ClientId: clientId,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: "name",
        Value: userName,
      },
      {
        Name: "email",
        Value: email,
      },
    ],
  };
  let newUser;
  // let confirmationCode;
  try {
    newUser = await cognito.signUp(params).promise();
    // if (newUser) {
    //   const params = {
    //     AccessToken: newUser.UserSub,
    //     Username: newUser.email,
    //   };
    //   confirmationCode = await cognito
    //     .getUserAttributeVerificationCode(params)
    //     .promise();
    // }
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(newUser),
  };
}

export const handler = commonMiddleware(createNewUser);
