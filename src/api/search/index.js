import axiosInstance from ".."

export async function search({ word,type, context,topic  }) {
    try {
        const tags = [];
        if (type)
            tags.push(type)
        if (context) 
            tags.push(context)
        if (topic)
            tags.push(topic)
        const res = await axiosInstance.get('search', {
            params: {
                word,tags
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