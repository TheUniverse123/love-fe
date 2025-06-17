import { axiosInstanceJson } from "./axiosInstance"

export const fetchPointHistory = async (pageNumber, pageSize) => {
    const data = await axiosInstanceJson.get(`/api/Points/history?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response) => {
            return response.data.result
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}

export const fetchPoint = async () => {
    const data = await axiosInstanceJson.get(`/api/Points/my-points`)
        .then((response) => {
            return response.data.result
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}