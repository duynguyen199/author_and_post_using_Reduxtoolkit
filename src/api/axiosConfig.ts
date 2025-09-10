import axios from "axios";

const axiosInstance= axios.create({
    baseURL:'http://localhost:3001/api/v1',
    timeout:10000,
    headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
  },
}) 

axiosInstance.interceptors.response.use((response)=>{
    return response.data
},()=>{

})

export default axiosInstance