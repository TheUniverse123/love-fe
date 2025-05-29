import { axiosInstanceJson } from "./axiosInstance"

export const fetchCountConfirmTicket = async (userId) => {
    const data = await axiosInstanceJson.get(`/api/UserBookings/confirmed-ticket-count/${userId}`)
        .then((response) => {
            return response.data.result.confirmedTicketCount
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}