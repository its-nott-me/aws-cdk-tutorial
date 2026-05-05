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
  // body: JSON.stringify({
  //   location: 'Dublin'
  // })
} as any, {} as any)