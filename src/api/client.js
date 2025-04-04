import axios from "axios";

export async function getData(params) {
    try{
        const response = await axios.get(`http://127.0.0.1:8000/${params}/get-all`)
        return response.data
    }catch(error){
        console.error(error)
        console.log(error.response.status);
        console.log(error.response.headers);
        return []
    }
}

export async function getItem(params) {
    try{
        const response = await axios.get('http://127.0.0.1:8000/order/get-item/1')
        return response.data
    }catch(error){
        console.error(error)
        console.log(error.response.status);
        console.log(error.response.headers);
        return []
    }
}

export async function posttItem(params) {
    try{
        const response = await axios.post('http://127.0.0.1:8000/order/create',{item_id: 1})
        return response.data
    }catch(error){
        console.error(error)
        console.log(error.response.status);
        console.log(error.response.headers);
        return []
    }
}
export async function putData(params) {
    try{
        const response = await axios.put('http://127.0.0.1:8000/order/1',{item_id: 1})
        return response.data
    }catch(error){
        console.error(error)
        console.log(error.response.status);
        console.log(error.response.headers);
        return []
    }
}

