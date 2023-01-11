import axiosInstance from '..';

export const postRequest = async(url, post) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axiosInstance.post(`${url}`, post , {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            } );
        
        console.log("ok: ", res.data);
        return 1;
    } catch (error) {
        console.log("loi");
        return {
            success: false,
            message: error.response.data.message
        }
    }
}