import jwksClient from "jwks-rsa";

const client = jwksClient({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10, // Default value
    jwksUri: 'https://my.transfergo.com/api/user/auth/jwks'// process.env.JWKS_URI
});



