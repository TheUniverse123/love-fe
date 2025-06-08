import { axiosInstanceJson } from './axiosInstance';

export const fetchDeclineWorkshop = async (workshopId) => {
    const data = await axiosInstanceJson.put(`/api/Workshops/cancel/${workshopId}`)
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
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
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}

export const fetchWorkshopByUsers = async ({ signal, pageNumber, pageSize, userId }) => {
    const data = await axiosInstanceJson.get(`/api/Workshops/creator/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response) => {
            return response.data.result
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
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
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
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
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
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
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}

export async function fetchUpdateWorkshop(workshopId, updatedData) {
    const data = await axiosInstanceJson.put(`/api/Workshops/update-json/${workshopId}`, updatedData)
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            return error
        })
    return data
}

export async function fetchUpdateTicket(ticketId, updatedData) {
    const data = await axiosInstanceJson.put(`/api/WorkshopTicketInfo/${ticketId}`, updatedData)
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            return error
        })
    return data
}

export const fetchWorkshopDetail = async ({ signal, workshopId }) => {
    const data = await axiosInstanceJson.get(`/api/Workshops/get-by-id/${workshopId}`)
        .then((response) => {
            return response.data.result
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}

export const fetchTicketDetail = async ({ signal, workshopId = 1 }) => {
    const data = await axiosInstanceJson.get(`/api/WorkshopTicketInfo/${workshopId}`)
        .then((response) => {
            return response.data.result
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}

export const fetchCheckout = async (bookingInfo) => {
    const data = await axiosInstanceJson.post(`/api/UserBookings/book-ticket`, bookingInfo)
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}

export const fetchCancelTicket = async (ticketCode) => {
    const data = await axiosInstanceJson.put(`/api/UserBookings/cancel/${ticketCode}`)
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}

export const fetchCheckin = async (ticketCode) => {
    const data = await axiosInstanceJson.post(`/api/Checkin/by-code`, {
        checkinCode: ticketCode
    })
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}
