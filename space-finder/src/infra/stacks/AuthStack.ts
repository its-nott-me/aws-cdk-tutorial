import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

// use this to activate user from aws-cli
// aws cognito-idp admin-set-user-password --user-pool-id ap-south-2_pMdCDT0gT --username Vivek --password "kdghnfg3468*" --permanent

export class AuthStack extends Stack {
  public userPool!: UserPool;
  private userPoolClient!: UserPoolClient;
  
  constructor(scope: Construct, id: string, props?: StackProps){
    super(scope, id, props);

    this.createUserPool();
    this.createUserPoolClient();
  }

  private createUserPool(){
    this.userPool = new UserPool(this, 'SpaceUserPool', {
      selfSignUpEnabled: true,
      signInAliases: {
        username: true,
        email: true
      }
    })
    new CfnOutput(this, 'SpaceUserPoolId', {
      value: this.userPool.userPoolId
    })
  }

  private createUserPoolClient(){
    this.userPoolClient = this.userPool.addClient('SpaceUserPoolClient', {
      authFlows: {
        adminUserPassword: true,
        userPassword: true,
        custom: true,
        userSrp: true,
      }
    })
    new CfnOutput(this, 'SpaceUserPoolClientId', {
      value: this.userPoolClient.userPoolClientId
    })
  }
}