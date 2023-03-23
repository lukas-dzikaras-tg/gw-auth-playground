accept JWT token

Validate JWT token against hardcoded keys

Import JWKeys

Cache JWKeys

Return correct policy   



https://github.com/auth0-samples/jwt-rsa-aws-custom-authorizer/blob/master/package.json


 

functions
    main
        - extract JWT token
        - get JWKs
        - validate JWT
        - generate policy
            