import { axiosInstanceJson } from './axiosInstance';
export const fetchWorkshops = async ({ signal, pageNumber, pageSize }) => {
    const data = await axiosInstanceJson.get(`/api/Workshops/all?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response) => {
            return response.data.result.items
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}

export const fetchMostBookedWorkshops = async ({ signal, pageNumber, pageSize }) => {
    const data = await axiosInstanceJson.get(`/api/Workshops/most-booked?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response) => {
            return response.data.result.items
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}

export const fetchComingSoonWorkshops = async ({ signal, pageNumber, pageSize }) => {
    const data = await axiosInstanceJson.get(`/api/Workshops/upcoming?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response) => {
            return response.data.result.items
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}

export const fetchWorkshopsCount = async () => {
    const data = await axiosInstanceJson.get("/api/Workshops/district-counts")
        .then((response) => {
            return response.data.result
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}

export const fetchSearchWorkshops = async ({ signal, pageNumber, pageSize, search }) => {
    const data = await axiosInstanceJson.get(`/api/Workshops/search?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response) => {
            return response.data.result.items
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}