import { axiosInstanceJson } from './axiosInstance';
export const fetchWorkshops = async ({ signal, pageNumber, pageSize }) => {
    const data = await axiosInstanceJson.get(`/api/Workshops/all?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response) => {
            return response.data.result.items
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}

export const fetchWorkshopsExploreAll = async ({ signal, pageNumber, pageSize }) => {
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

export const fetchWorkshopsNumber = async () => {
    const data = await axiosInstanceJson.get(`/api/Workshops/all?pageNumber=${1}&pageSize=${1}`)
        .then((response) => {
            return response.data.result.totalCount
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
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
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
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
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
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
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}

export const fetchSearchWorkshops = async ({ signal, pageNumber, pageSize, search }) => {
    const keywordParam = search.keyword ? `&Keyword=${encodeURIComponent(search.keyword)}` : '';
    const data = await axiosInstanceJson
        .get(`/api/Workshops/search?pageNumber=${pageNumber}&pageSize=${pageSize}&District=${search.district}&CategoryId=${search.categoryId}&MinPrice=0&MaxPrice=${search.maxPrice}${keywordParam}`)
        .then((response) => {
            return response.data.result
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}

export const fetchWorkshopOfUsers = async ({ signal, userId }) => {
    try {
        const response = await axiosInstanceJson.get(`/api/Workshops/user/${userId}/workshop-startdates`, { signal });
        return response.data;
    } catch (error) {
        if (error?.response?.status === 404) {
            return {
                result: []
            }
        }
        throw error;
    }
};

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

export const fetchRegisteredWorkshopsByUser = async ({ signal, pageNumber, pageSize, userId }) => {
    const data = await axiosInstanceJson.get(`/api/Workshops/user/${userId}/workshops?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response) => {
            return response.data.result
        }
        ).catch((error) => {
            const errors = error?.response?.data.errorMessages || error?.response?.data.errors || []
            return errors
        })
    return data
}