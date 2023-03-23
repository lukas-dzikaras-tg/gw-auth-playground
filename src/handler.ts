import {
    APIGatewayTokenAuthorizerEvent, AuthResponse, Statement
} from "aws-lambda"
import {CertSigningKey, RsaSigningKey} from "jwks-rsa";

require('dotenv').config({silent: true});

const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');
const util = require('util');


const jwtOptions = {
    // ignoreExpiration: true,
    // audience: process.env.AUDIENCE,
    // issuer: process.env.TOKEN_ISSUER
};

const client = jwksClient({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10, // Default value
    jwksUri: 'https://api.ms.tgalpha.com/oauth/v2/oauth-anonymous/jwks'// process.env.JWKS_URI
});


export async function handleRequest(
    event: APIGatewayTokenAuthorizerEvent
): Promise<AuthResponse> {
    console.log('======================= START ===================== 2')

    const token = getToken(event.authorizationToken);

    const decoded = jwt.decode(token, {complete: true});
    if (!decoded || !decoded.header || !decoded.header.kid) {
        throw new Error('invalid token');
    }

    const getSigningKey = util.promisify(client.getSigningKey);

    console.log(getSigningKey);

    return getSigningKey(decoded.header.kid)
        //
        .then((key: any) => {
            const signingKey = key.publicKey || key.rsaPublicKey;
            return jwt.verify(token, signingKey, jwtOptions);
        })
        .then((decoded: any) => ({ //ANY
            principalId: decoded.sub,
            policyDocument: getPolicyDocument('Allow', event.methodArn),
            // policyDocument: getPolicyDocument('Deny', event.methodArn),
            context: {scope: "decoded.scope"}
        }));
}

const getPolicyDocument = (effect: any, resource:any) => {
    const policyDocument = {
        Version: '2012-10-17', // default version
        Statement: [{
            Action: 'execute-api:Invoke', // default action
            Effect: effect,
            Resource: resource,
        }]
    };
    return policyDocument;
}


// extract and return the Bearer Token from the Lambda event parameters
const getToken = (value:string) => {
    const match = value.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
        throw new Error(`Invalid Authorization token - ${value} does not match "Bearer .*"`);
    }
    return match[1];
}






