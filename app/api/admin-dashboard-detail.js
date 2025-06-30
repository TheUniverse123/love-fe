import { axiosInstanceJson } from "./axiosInstance";

export const fetchListParticipants = async ({ signal, pageNumber, pageSize }) => {
    const data = await axiosInstanceJson.get(`/api/admin-dashboard/usersbooking?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response) => {
            return response.data.result
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}

export const fetchListUsers = async ({ signal, pageNumber, pageSize }) => {
    const data = await axiosInstanceJson.get(`/api/Users/get-all?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response) => {
            return response.data.result
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}

export const fetchListWorkshops = async ({ signal, pageNumber, pageSize }) => {
    const data = await axiosInstanceJson.get(`/api/Workshops/all?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response) => {
            return response.data.result
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}