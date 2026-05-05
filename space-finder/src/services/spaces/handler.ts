import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { postSpaces } from "./PostSpaces";

const ddbClient = new DynamoDBClient({});

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  let message: string = ' ';
  
  try{
    switch(event.httpMethod){
      case 'GET':
        message = "Hello from GET!";
        break;
      case 'POST':
        const result = await postSpaces(event, ddbClient);
        return result;
      default: 
        break;
    }
  } catch(error: any) {
    console.log(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify(error.message)
    }
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message)
  }

  return response;
}

export { handler } 