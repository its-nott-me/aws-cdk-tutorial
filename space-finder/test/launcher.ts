import { handler } from "../src/services/spaces/handler";



// (async() => {
//   const res = await handler({
//     httpMethod: 'POST',
//     body: JSON.stringify({
//       location: 'London'
//     })
//   } as any, {} as any);
//   console.log(res)
// })();


process.env.TABLE_NAME='SpaceTable-0a14d8d7d02b';
process.env.AWS_REGION='ap-south-2';

handler({
  httpMethod: 'GET',
  // queryStringParameters: {
  //   id: 'db7dbeee-0167-4040-99d7-186939769c07'
  // }
  // body: JSON.stringify({
  //   location: 'Queensland'
  // })
} as any, {} as any)