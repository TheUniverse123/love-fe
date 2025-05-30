import { axiosInstanceJson } from './axiosInstance';
export const fetchWorkshopsSaved = async ({ signal, pageNumber, pageSize, userId }) => {
    const data = await axiosInstanceJson.get(`/api/UserSavedWorkshop/list?userId=${userId}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response) => {
            return response.data.result
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}

export const fetchWorkshopsSavedVer2 = async (pageNumber, pageSize, userId) => {
    const data = await axiosInstanceJson.get(`/api/UserSavedWorkshop/list?userId=${userId}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response) => {
            return response.data.result.totalCount
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}

export const fetchCheckWorkshop = async (userId, workshopId) => {
    const data = await axiosInstanceJson.get(`/api/UserSavedWorkshop/check?userId=${userId}&workshopId=${workshopId}`)
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}

export const fetchSaveFavouriteWorkshops = async (userId, workshopId) => {
    const data = await axiosInstanceJson.post(`/api/UserSavedWorkshop/save?userId=${userId}&workshopId=${workshopId}`)
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}

export const fetchRemoveFavouriteWorkshops = async (userId, workshopId) => {
    const data = await axiosInstanceJson.delete(`/api/UserSavedWorkshop/remove?userId=${userId}&workshopId=${workshopId}`)
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}