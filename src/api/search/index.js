import axiosInstance from ".."

export async function search({ word, tag, category }) {
    try {
        const res = await axiosInstance.get('search', {
            word,
            tag,
            category
        })
        return {
            success: true,
            data: res.data
        }
    } catch (error) {
        return {
            success: false,
            message: error.response.data.message
        }
    }
}