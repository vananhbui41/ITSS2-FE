import axiosInstance from '..';

export async function search({ keyword, type, context, topic }) {
  try {
    const tags = [];
    if (type) tags.push(...type);
    if (context) tags.push(...context);
    if (topic) tags.push(...topic);
    const token = localStorage.getItem('token');
    let config = {};
    if (token) {
      config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
    if (keyword) {
      const res = await axiosInstance.get('search', {
        params: {
          keyword,
          tags,
        },
        config,
      });
      return {
        success: true,
        data: res.data,
      };
    }
    const res = await axiosInstance.get('search', {
      params: { tags },
      config,
    });
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    console.log('error', error);
    return {
      success: false,
      message: error,
    };
  }
}
export async function getCategories() {
  try {
    const res = await axiosInstance.get('categories');
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
}
export async function getTags() {
  try {
    const res = await axiosInstance.get('tags');
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
}

export async function getHistory() {
  try {
    const token = localStorage.getItem('token');

    const res = await axiosInstance.get('histories', {
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
