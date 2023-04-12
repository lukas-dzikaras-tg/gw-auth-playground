import {APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult} from 'aws-lambda';
import JwksRsa, {SigningKey} from "jwks-rsa";
import {PolicyDocument} from "aws-lambda/trigger/api-gateway-authorizer";
import {JwtPayload, VerifyOptions} from "jsonwebtoken";

const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');
const util = require('util');

const jwtOptions = <VerifyOptions>{
};

const client = jwksClient(<JwksRsa.Options>{
    cache: true,
    jwksUri: process.env.JWKS_URI
});


export const handler = (event: APIGatewayTokenAuthorizerEvent, context: any, callback: (err: Error | null, result?: APIGatewayAuthorizerResult) => void) => {
    const authToken = parseToken(event.authorizationToken);

    const decoded = authToken && jwt.decode(authToken, {complete: true});
    if (!decoded) {
        console.error(`Unable to parse authorization token. Token: ${authToken}`);
        callback(new Error("Unauthorized"));
    }

    const getSigningKey = util.promisify(client.getSigningKey);

    return getSigningKey(decoded.header.kid)
        .then((key: SigningKey) => {
            const signingKey = key.getPublicKey();
            return jwt.verify(authToken, signingKey, jwtOptions);
        })
        .then((decoded: JwtPayload) => (<APIGatewayAuthorizerResult>{
            principalId: decoded.sub,
            policyDocument: getPolicyDocument('Allow', event.methodArn),
        }))
        .catch((error: any) => {
                console.error(`Invalid token. Error: ${error.message}`);
                callback(new Error("Unauthorized"));
            }
        );
};

const parseToken = (value:string): string|null => {
    const match = value.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
        return null
    }
    return match[1];
}

const getPolicyDocument = (effect: string, resource: string): PolicyDocument => {
    return {
        Version: '2012-10-17', // default version
        Statement: [{
            Action: 'execute-api:Invoke', // default action
            Effect: effect,
            Resource: resource,
        }]
    };
}