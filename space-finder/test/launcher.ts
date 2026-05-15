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
  //   id: 'a022dada-b998-4e07-9991-3ee676dca7f9'
  // },
  // body: JSON.stringify({
  //   location: 'Queensland-2'
  // })
} as any, {} as any).then(res => {
  console.log(res)
})