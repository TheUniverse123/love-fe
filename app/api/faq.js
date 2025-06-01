import { axiosInstanceJson } from './axiosInstance';

export const fetchFAQList = async () => {
    const data = await axiosInstanceJson.get("/api/Faq/question/list")
        .then((response) => {
            return response.data.result
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}

export const fetchAnswerList = async (questionId) => {
    const data = await axiosInstanceJson.get(`/api/Faq/answer/list?questionId=${questionId}`)
        .then((response) => {
            return response.data.result
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}

export const fetchCreateQuestion = async (question) => {
    const data = await axiosInstanceJson.post("/api/Faq/question/create", question)
        .then((response) => {
            return response.data
        }
        ).catch((error) => {
            const errors = error.response.data.errorMessages || error.response.data.errors || []
            return errors
        })
    return data
}