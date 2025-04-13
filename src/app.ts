import express, { Application, NextFunction, Request, response, Response } from "express"
import cors from "cors"
import router from "./routes"
import statusCode from "http-status";
import cookieParser from "cookie-parser"

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: "Ph health care is open."
    })
})

app.use('/api/v1', router)

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        errorMessage: error.message || "Something went wrong",
        errorName: error.name || "Something went wrong",
        error
    })
})

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(statusCode.NOT_FOUND).json({
        status: false,
        message: "Api Not Found",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not valid."
        }
    })
})

export default app;