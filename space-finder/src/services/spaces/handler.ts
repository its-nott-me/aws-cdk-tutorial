import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";
import { postSpacesWithDoc } from "./PostSpacesWithDoc";

const ddbClient = new DynamoDBClient({});

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  let message: string = ' ';
  
  try{
    switch(event.httpMethod){
      case 'GET':
        const getResponse = await getSpaces(event, ddbClient);
        return getResponse;
      case 'POST':
        const postResponse = await postSpacesWithDoc(event, ddbClient);
        return postResponse;
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