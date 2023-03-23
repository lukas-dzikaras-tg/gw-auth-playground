import {APIGatewayTokenAuthorizerEvent} from "aws-lambda"
import {handleRequest} from "./handler"
import {mockTokenEvent} from "./mock";
// import Configuration from "./configuration"
import dotenv from "dotenv"

dotenv.config()


// const event:APIGatewayRequestAuthorizerEvent = {
//     headers: undefined,
//     httpMethod: "",
//     methodArn: "",
//     multiValueHeaders: undefined,
//     multiValueQueryStringParameters: undefined,
//     path: "",
//     pathParameters: undefined,
//     queryStringParameters: undefined,
//     requestContext: undefined,
//     resource: "",
//     stageVariables: undefined,
//     type: "REQUEST"
// }


//eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjM1NDE4ZjE5LWMwYjktNDc3YS1hMWE2LTIxYTAwNjFhMTk1MiJ9.eyJpc3MiOiJUcmFuc2ZlckdvIiwic3ViIjoiNTU1MzIyMSIsInVzZXJfaWQiOjU1NTMyMjEsImlhdCI6MTY3Nzg0NjUxNywibmJmIjoxNjc3ODQ2NTE3LCJleHAiOjE2Nzc4NTAxMTd9.nI5_hiIJxqBUDqh_M5DaJkaJNpZVnW4olMHb2EXOoTlhg9nPnPUYTZkV-v8SfAcWYRUUSomM3qkjdnTpZWco-Oi8xnloy0vlHD_K5-EIyoJ2Ejle3-SZ2-JXkyQ9ZH9rVFbrUfxr_j35OFHjYg7SfPKa4mqkxnWxHYMTTowR4rV19hqfMR1Q_1dOOcqygK5f2rI3prs2meFs6LhtUWA0Apg8UwaOHWUfgLsd-OaR6zvoqCeauD8TxeXg-AbdT7hyWiSBoy7RjKjhLs5f4Xy66m6kwEQN80h1vFWqGN3g8DNPjRuYvpf_vOnH6hws7SJd9iMct9Y-aHjKMqSqpbaYmw";


exports.handler = async (event: APIGatewayTokenAuthorizerEvent) => {
    // if (event.authorizationToken === null) {
    // //     event = mockTokenEvent;
    // // }
    // console.log({'e': "e", event, "o": typeof event, 'eee': event === null})
    // // event ??= mockTokenEvent;
    // return await handleRequest( mockTokenEvent);//event, getConfiguration())
    return await handleRequest(event);//event, getConfiguration())
};

// const getConfiguration = () => new Configuration(
//     process.env.TRUSTED_WEB_ORIGINS || "",
//     process.env.COOKIE_NAME_PREFIX || "",
//     process.env.ENCRYPTION_KEY || "",
//     process.env.USE_PHANTOM_TOKEN === "true",
//     process.env.INTROSPECTION_URL || "",
//     process.env.CLIENT_ID || "",
//     process.env.CLIENT_SECRET || "",
//     process.env.ALLOW_TOKEN === "false"
// )