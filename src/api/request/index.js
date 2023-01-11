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
        return res.data;
    } catch (error) {
        console.log("loi");
        return {
            status:0,
            success: false,
            message: error.response.data.message
        }
    }
}