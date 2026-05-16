import { Amplify } from 'aws-amplify'
import { SignInOutput, fetchAuthSession, signIn } from '@aws-amplify/auth'
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

const awsRegion = 'ap-south-2';

Amplify.configure({
  Auth :{
    Cognito: {
      userPoolId: 'ap-south-2_pMdCDT0gT',
      userPoolClientId: '6btcbv5m8hi4lk98qvu9r9ad2t',
      identityPoolId: 'ap-south-2:d5245bc3-2798-4143-9159-2bc395433dba'
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

  public async generateTemporaryCredentials(){
    const idToken = await this.getIdToken();
    if(!idToken) {
      throw new Error( 'User not authenticated');
    }

    const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/ap-south-2_pMdCDT0gT`
    const cognitoIdentity = new CognitoIdentityClient({
      credentials: fromCognitoIdentityPool({
        identityPoolId: 'ap-south-2:d5245bc3-2798-4143-9159-2bc395433dba',
        logins: {
          [cognitoIdentityPool]: idToken
        }
      })
    })
    const credentials = await cognitoIdentity.config.credentials();
    return credentials;
  }
}