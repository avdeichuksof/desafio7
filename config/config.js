import dotenv from 'dotenv'
dotenv.config()

export default {
    port: process.env.PORT,
    mongoPassword: process.env.DB_PASSWORD,
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
}