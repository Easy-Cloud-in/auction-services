import AWS from "aws-sdk";
import commonMiddleware from "../lib/commoMiddleware";
import validator from "@middy/validator";
import placeBidSchema from "../lib/schemas/placeBidSchema";
import createError from "http-errors";
import { getAuctionById } from "./getAuction";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function placeBid(event, context) {
  const { id } = event.pathParameters;
  const { amount } = event.body;

  const auction = await getAuctionById(id);

  if (auction.status !== "OPEN") {
    throw new createError.Forbidden("You can't bid on closed auctions!");
  }

  if (amount <= auction.highestBid.amount) {
    throw new createError.Forbidden(
      `You bid must be higher then ${auction.highestBid.amount}!`
    );
  }

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id },
    UpdateExpression: "set highestBid.amount = :amount",
    ExpressionAttributeValues: {
      ":amount": amount,
    },
    ReturnValues: "ALL_NEW",
  };

  let updateAuction;
  try {
    const result = await dynamodb.update(params).promise();
    updateAuction = result.Attributes;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updateAuction),
  };
}

export const handler = commonMiddleware(placeBid).use(
  validator({ inputSchema: placeBidSchema })
);
