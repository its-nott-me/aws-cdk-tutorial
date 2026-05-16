import { AuthService } from "./AuthService";


async function testAuth(){
  const service = new AuthService();
  const loginResult = await service.login(
    'Vivek',
    'Abcdefgh1)'
  )
  const idToken = await service.getIdToken();
  console.log(idToken)
}

testAuth();