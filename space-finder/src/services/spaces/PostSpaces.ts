import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";


export async function postSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {  
  const tableName = process.env.TABLE_NAME;
  
  if(!tableName){
    throw new Error("TABLE_NAME is undefined")
  }
  
  if(!event.body){
    return {
      statusCode: 400,
      body: JSON.stringify("Request body is required")
    }
  }
  
  const item = JSON.parse(event.body || '{}');
  const randomId = v4();
  
  const result = await ddbClient.send(new PutItemCommand({
    TableName: tableName,
    Item: {
      id: {
        S: randomId
      },
      location: {
        S: item.location
      }
    },
    ReturnValues: "ALL_OLD"
  }));

  console.log(result);

  return {
    statusCode: 201,
    body: JSON.stringify({id: randomId})
  }
}