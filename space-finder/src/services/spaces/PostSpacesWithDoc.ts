import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";


export async function postSpacesWithDoc(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {  
  const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

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

  let body = JSON.parse(event.body || '{}');
  
  const item = {
    id: v4(),
    ...body,
  }
  
  const result = await ddbDocClient.send(new PutCommand({
    TableName: tableName,
    Item: item,
    ReturnValues: "ALL_OLD"
  }));

  console.log(result);

  return {
    statusCode: 201,
    body: JSON.stringify({id: item.id})
  }
}