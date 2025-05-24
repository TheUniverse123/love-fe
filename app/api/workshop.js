import { axiosInstanceJson } from './axiosInstance';
export const fetchWorkshops = async ({ signal, pageNumber, pageSize }) => {
    const data = await axiosInstanceJson.get(`/api/Workshops/all?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}