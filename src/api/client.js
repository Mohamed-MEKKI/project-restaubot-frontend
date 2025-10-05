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


export async function getItem(params, id) {
    try{
        const response = await axios.get(`http://127.0.0.1:8000/${params}/get_one_item/${id}`)
        console.log(response.data);
        return response.data
    }catch(error){
        console.error(error)
        console.log(error.response.status);
        console.log(error.response.headers);
        return []
    }
}

export async function postItem(params, form) {
    try{
        const response = await axios.post(`http://127.0.0.1:8000/${params}/create`,form,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
    )
        return response.data
    }
    catch(error){
        console.error(error)
        console.log(error.response.status);
        console.log(error.response.headers);
        return []
    }
}

export async function putData(params, item_id, newStatus) {
    try{
        const response = await axios.put(`http://127.0.0.1:8000/${params}/update_status/${item_id}`,{status:newStatus})
        return response.data
    }catch(error){
        console.error(error)
        console.log(error.response.status);
        console.log(error.response.headers);
        return []
    }
}

