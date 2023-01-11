import axiosInstance from '..';

export async function getWords() {
  try {
    const res = await axiosInstance.get('words');
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
