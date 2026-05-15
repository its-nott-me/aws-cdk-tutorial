import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";
import { postSpacesWithDoc } from "./PostSpacesWithDoc";
import { updateSpace } from "./UpdateSpaces";
import { deleteSpace } from "./DeleteSpace";
import { JsonError, MissingFieldError } from "../shared/Validator";

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
      case 'PUT':
        const putResponse = await updateSpace(event, ddbClient);
        return putResponse;
      case 'DELETE':
        const deleteResponse = await deleteSpace(event, ddbClient);
        return deleteResponse;
      default: 
        break;
    }
  } catch(error: any) {
    console.log(error.message);
    if(error instanceof MissingFieldError){
      return {
        statusCode: 400,
        body: error.message,
      }
    }
    if(error instanceof JsonError){
      return {
        statusCode: 400,
        body: error.message
      }
    }
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