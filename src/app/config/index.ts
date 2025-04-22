import dotenv from "dotenv"
import path from "path"

dotenv.config({path: path.join(process.cwd(), '.env')})

export default {
    port: process.env.PORT,
    node_dev: process.env.NODE_ENV,
    jwt_secrete: process.env.JWT_SECRET_TOKEN,
    jwt_secrete_expires_in: process.env.JWT_SECRET_EXPIRE_IN,
    jwt_refresh: process.env.JWT_REFRESH_TOKEN,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRE_IN,
    reset_pass_secrete: process.env.RESET_PASS_TOKEN,
    reset_pass_expires_in: process.env.RESET_PASS_EXPIRE_IN,
    reset_pass_link: process.env.RESET_PASS_LINK,
    email: process.env.EMAIL,
    app_pass: process.env.APP_PASS,

    cloudinary: {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRETE
    }
}