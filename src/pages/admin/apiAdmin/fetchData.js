import axios from "axios";

const apiUrl = "https://lavie-backend.herokuapp.com/api";

export const getData = async (url, param = null) => {
  const res = await axios.get(`${apiUrl}/${url}`, {
   
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    // params:{
    //   "name" : "casual",
    //   "category": "context"
    // }
  
  
  });
 
  const data = res.data;
  return data;
};

export const searchTagDB = async (url, t, c) => {
  const res = await axios.get(`${apiUrl}/${url}`, {
   
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    params:{
      "name" : t,
      "category": c
    }
  
  
  });
 
  const data = res.data;
  return data;
};

export const postData = async (url, post) => {
  // console.log("cc: ", c);

  
  const res = await axios.post(`${apiUrl}/${url}`,post, {
    headers: {
      "Content-Type": "application/json",
      
    },
    // params: {
    //   'category_id' : c,
    //   'name': t
    // }
  });

  const data = res.data;
  console.log("post: ", data);
  return data;
};

export const putData = async (url, post) => {
  const res = await axios.put(`${apiUrl}/${url}`, post, {
    headers: {
      "Content-Type": "application/json",
     
    },
  });

  const data = res.data;
  console.log("put: ", data);
  return data;
};



export const deleteData = async (url) => {
  const res = await fetch(`${apiUrl}/${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
     
    },
  });

  const data = await res.json();
  return data;
};