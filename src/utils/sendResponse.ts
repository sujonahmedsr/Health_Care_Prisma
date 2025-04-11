import { Response } from "express"

const sendResponse = <T> (res: Response, jsonData: {
    statusCode: number,
    success: boolean,
    message: string,
    meta?: {
        page: number | undefined,
        limit: number | undefined,
        total: number | undefined
    },
    data: T | null | undefined
}) => {
    res.status(jsonData.statusCode).json({
        success: jsonData.success || 500,
        message: jsonData.message || "Something went wrong.",
        meta: jsonData.meta || null || undefined,
        data: jsonData.data || null || undefined
    })
}

export default sendResponse