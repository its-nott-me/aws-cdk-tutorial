import { DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export async function getSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

  if(event.queryStringParameters){
    if('id' in event.queryStringParameters){
      const spaceId = event.queryStringParameters['id'];
      const getItemResponse = await ddbClient.send(new GetItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          'id': { S: spaceId! }
        }
      }))

      if(getItemResponse.Item){
        // unmarshall single items
        const unmarshalledItem = unmarshall(getItemResponse.Item);
        return {
          statusCode: 200,
          body: JSON.stringify(unmarshalledItem)
        }
      } 
      
      else {
        return {
          statusCode: 400,
          body: JSON.stringify(`Space with Id: ${spaceId} not found!`)
        }
      }
    } 
    
    else {
      return {
        statusCode: 400,
        body: JSON.stringify('Id is required')
      }
    }
  }

  const response = await ddbClient.send(new ScanCommand({
    TableName: process.env.TABLE_NAME
  }));

  console.log(response.Items);
  // unmarshall an array of items
  const unmarshalledItems = response?.Items?.map(item => unmarshall(item));
  return {
    statusCode: 200,
    body: JSON.stringify(unmarshalledItems)
  }
}