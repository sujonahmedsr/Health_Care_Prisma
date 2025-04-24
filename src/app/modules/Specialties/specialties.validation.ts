import { z } from "zod";

export const createSpe = z.object({
    title: z.string({
        required_error: "Title is required!"
    })
});
