import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { validateAsSpaceEntry } from "../shared/Validator";
import { createRandomId, parseJSON } from "../shared/Utils";


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
  
  const item = parseJSON(event.body);
  const randomId = createRandomId();
  item.id = randomId;
  validateAsSpaceEntry(item);
  
  const result = await ddbClient.send(new PutItemCommand({
    TableName: tableName,
    Item: marshall(item),
    ReturnValues: "ALL_OLD"
  }));

  console.log(result);

  return {
    statusCode: 201,
    body: JSON.stringify({id: randomId})
  }
}