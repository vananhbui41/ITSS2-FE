import axiosInstance from '..';

export async function getBookMarkList() {
    try {
      const token = localStorage.getItem('token');
  
      const res = await axiosInstance.get('bookmarks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        success: true,
        ...res,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
}

export async function createBookMark(id) {
    try {
        const token = localStorage.getItem('token');
        const res = await axiosInstance.post('bookmarks', { "word_id": id }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return {
            success: true
        }
    } catch (error) {
        return {
        success: false,
      };
    }
}

export async function deleteBookMark(id) {
    try {
        const token = localStorage.getItem('token');
        const res = await axiosInstance.delete(`bookmarks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return {
            success: true
        }
    } catch (error) {
        return {
        success: false,
      };
    }
}