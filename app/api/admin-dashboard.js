import { axiosInstanceJson } from "./axiosInstance";

export const fetchAdminDashboardOverview = async () => {
    const data = await axiosInstanceJson.get(`/api/admin-dashboard/all-statistics`)
        .then((response) => {
            return response.data.result
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}

export const fetchWorkshopRevenue = async () => {
    const data = await axiosInstanceJson.get(`/api/admin-dashboard/revenue-weekly`)
        .then((response) => {
            return response.data.result
        })
        .catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}

export const fetchWorkshopOrganizer = async () => {
    const data = await axiosInstanceJson.get(`/api/admin-dashboard/organizer-weekly`)
        .then((response) => {
            return response.data.result
        })
        .catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}

export const fetchWorkshopParticipant = async () => {
    const data = await axiosInstanceJson.get(`/api/admin-dashboard/participant-weekly`)
        .then((response) => {
            return response.data.result
        })
        .catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}

export const fetchWorkshopTopRevenue = async () => {
    const data = await axiosInstanceJson.get(`/api/admin-dashboard/top-workshops-revenue?top=3`)
        .then((response) => {
            return response.data.result.workshops
        })
        .catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}

export const fetchWorkshopBottomRevenue = async () => {
    const data = await axiosInstanceJson.get(`/api/admin-dashboard/bottom-workshops-revenue?top=3`)
        .then((response) => {
            return response.data.result.workshops
        })
        .catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}

export const fetchRecentCreatedWorkshops = async ({ signal, pageNumber, pageSize }) => {
    const data = await axiosInstanceJson.get(`/api/admin-dashboard/recent-workshops?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response) => {
            return response.data.result
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}