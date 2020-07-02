async function sendConfirmationCode(event, context) {
  var forgotPasswordMessage = `
  <!DOCTYPE html>
  <html>
    <head></head>
    <body>
    <h1>Your Confirmation Code</h1>
    <p>------------------------</P>
    <h3> ${event.request.codeParameter} </h3>
    </body>
  </html>
  `;

  if (event.triggerSource === "CustomMessage_SignUp") {
    event.response.emailMessage = forgotPasswordMessage;
  }

  return event;
}

export const handler = sendConfirmationCode;
