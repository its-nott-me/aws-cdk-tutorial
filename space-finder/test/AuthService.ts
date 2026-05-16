import { Amplify } from 'aws-amplify'
import { SignInOutput, fetchAuthSession, signIn } from '@aws-amplify/auth'

const awsRegion = 'ap-south-2';

Amplify.configure({
  Auth :{
    Cognito: {
      userPoolId: 'ap-south-2_pMdCDT0gT',
      userPoolClientId: '6btcbv5m8hi4lk98qvu9r9ad2t'
    }
  }
})

export class AuthService {

  public async login(userName: string, password: string) {
    const signInOutput: SignInOutput = await signIn({
      username: userName,
      password: password,
      options: {
        authFlowType: 'USER_PASSWORD_AUTH'
      }
    })

    return signInOutput;
  }

  /** 
   * call only after login
  **/
  public async getIdToken(){
    const authSession = await fetchAuthSession();
    return authSession.tokens?.idToken?.toString();
  }
}