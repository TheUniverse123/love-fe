import { axiosInstanceJson } from './axiosInstance';

export const fetchDeclineWorkshop = async (workshopId) => {
    const data = await axiosInstanceJson.put(`/api/Workshops/cancel/${workshopId}`)
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}

export const fetchApproveWorkshop = async (workshopId) => {
    const data = await axiosInstanceJson.post("/api/Users/approve", {
        workshopId
    })
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}

export const fetchWorkshopByUsers = async ({ signal, pageNumber, pageSize, userId }) => {
    const data = await axiosInstanceJson.get(`/api/Workshops/user/${userId}/workshops?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response) => {
            return response.data.result
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}

export const fetchOrderedTickets = async ({ signal, pageNumber, pageSize, userId }) => {
    const data = await axiosInstanceJson.get(`/api/UserBookings/getAll?userId=${userId}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response) => {
            return response.data.result
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}

export const fetchCreateWorkshop = async (workshopInfo) => {
    const data = await axiosInstanceJson.post("/api/Workshops/create-json", workshopInfo)
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}

export const fetchCreateTicket = async (ticketInfo) => {
    const data = await axiosInstanceJson.post("/api/WorkshopTicketInfo", ticketInfo)
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}