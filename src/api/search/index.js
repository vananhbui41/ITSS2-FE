import axiosInstance from ".."

export async function search({ word, tag, category }) {
    try {
        const res = await axiosInstance.get('search', {
            params: {
                word,tag,category
            }
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
export async function getCategories() {
    try {
        const res = await axiosInstance.get('categories')
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
export async function getTags() {
    try {
        const res = await axiosInstance.get('tags')
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