import { DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function getSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {


  const response = await ddbClient.send(new ScanCommand({
    TableName: process.env.TABLE_NAME
  }));

  console.log(response.Items);

  return {
    statusCode: 200,
    body: JSON.stringify(response.Items)
  }
}