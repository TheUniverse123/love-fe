import { axiosInstanceJson } from './axiosInstance';

export const fetchCategoryCount = async () => {
    const data = await axiosInstanceJson.get("/api/Categories/category-workshop-count")
        .then((response) => {
            return response?.data.result
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}