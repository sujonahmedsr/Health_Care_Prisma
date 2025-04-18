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
}