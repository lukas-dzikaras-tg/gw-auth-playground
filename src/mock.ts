import {APIGatewayTokenAuthorizerEvent} from "aws-lambda/trigger/api-gateway-authorizer";


const tokenEvent: APIGatewayTokenAuthorizerEvent = {
    type: 'TOKEN',
    methodArn: 'arn:aws:execute-api:eu-west-1:510297465874:6d1qa1yyd2/ESTestInvoke-stage/GET/',
    authorizationToken: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjM1NDE4ZjE5LWMwYjktNDc3YS1hMWE2LTIxYTAwNjFhMTk1MiJ9.eyJpc3MiOiJUcmFuc2ZlckdvIiwic3ViIjoiNTU1MzIyMSIsInVzZXJfaWQiOjU1NTMyMjEsImlhdCI6MTY3Nzg0NjUxNywibmJmIjoxNjc3ODQ2NTE3LCJleHAiOjE2Nzc4NTAxMTd9.nI5_hiIJxqBUDqh_M5DaJkaJNpZVnW4olMHb2EXOoTlhg9nPnPUYTZkV-v8SfAcWYRUUSomM3qkjdnTpZWco-Oi8xnloy0vlHD_K5-EIyoJ2Ejle3-SZ2-JXkyQ9ZH9rVFbrUfxr_j35OFHjYg7SfPKa4mqkxnWxHYMTTowR4rV19hqfMR1Q_1dOOcqygK5f2rI3prs2meFs6LhtUWA0Apg8UwaOHWUfgLsd-OaR6zvoqCeauD8TxeXg-AbdT7hyWiSBoy7RjKjhLs5f4Xy66m6kwEQN80h1vFWqGN3g8DNPjRuYvpf_vOnH6hws7SJd9iMct9Y-aHjKMqSqpbaYmw'
}

export const mockTokenEvent = tokenEvent;



// return {
//     principalId: "FOO",
//     policyDocument: {
//         Version: '2012-10-17',
//         Statement: [
//             {
//                 Action: "execute-api:Invoke:123",
//                 Effect: "Allow",
//                 Resource: "arn:aws:execute-api:eu-west-1:510297465874:6d1qa1yyd2/ESTestInvoke-stage/GET/"
//             }
//         ]
//     }
// }