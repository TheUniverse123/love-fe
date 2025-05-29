import { axiosInstanceJson } from "./axiosInstance"

export const fetchRatingByWorkshop = async (pageNumber, pageSize, workshopId) => {
    const data = await axiosInstanceJson.get(`/api/Review/workshop/${workshopId}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}

export const fetchPostReview = async (post) => {
    const data = await axiosInstanceJson.post("/api/Review", post)
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}