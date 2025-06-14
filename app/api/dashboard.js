import { axiosInstanceJson } from './axiosInstance';
export const fetchDashboardWidget = async () => {
    const data = await axiosInstanceJson.get("/api/Analytics/my-dashboard")
        .then((response) => {
            return response.data.result.stats
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}

export const fetchMonthlyStats = async () => {
    const currentYear = (new Date()).getFullYear()
    const data = await axiosInstanceJson.get(`/api/Analytics/my-monthly-stats?year=${currentYear}`)
        .then((response) => {
            return response.data.result.monthlyStats
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}

export const fetchNewRegisterUsers = async (userId) => {
    const data = await axiosInstanceJson.get(`/api/UserBookings/getAll-UserBooking?pageNumber=1&pageSize=1000`)
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}

export const fetchWorkshopRecentRegisterUser = async () => {
    const data = await axiosInstanceJson.get("/api/UserBookings/recent")
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}