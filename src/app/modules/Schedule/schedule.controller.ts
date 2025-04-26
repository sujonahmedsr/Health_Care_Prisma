import { Request, Response } from "express";
import httpStatus from "http-status";
import { ScheduleService } from "./schedule.sevice";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const inserIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await ScheduleService.inserIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Schedule created successfully!",
        data: result
    });
});


export const ScheduleController = {
    inserIntoDB
};