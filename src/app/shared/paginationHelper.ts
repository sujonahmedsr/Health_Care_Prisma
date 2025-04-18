export interface IOptions {
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string
}

interface IReturns {
    page?: number,
    limit?: number,
    skip: number,
    sortBy?: string,
    sortOrder?: string
}
export const calculatePagination = (options: IOptions): IReturns => {
    const page: number = Number(options.page) || 1
    const limit: number = Number(options.limit) || 10
    const skip: number = (page - 1) * limit;

    const sortBy: string = options.sortBy || "createdAt"
    const sortOrder: string = options.sortOrder || "desc"

    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    }
}