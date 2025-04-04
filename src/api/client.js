import axios from "axios";

async function getData(params) {
    await axios.get('http://127.0.0.1:7000/')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                if (error.response ){
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                console.error(error);
                }
            });
    
}

async function postData(params) {
    await axios.post('http://127.0.0.1:7000/')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                if (error.response ){
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                console.error(error);
                }
            });
    
}

export async function putData(params) {
    const putData = await axios.put('http://127.0.0.1:7000/items/1',{item_id: 1})
            .then(response => {
                console.log(response.data.item_name);
                return response.data.item_name;
            })
            .catch(error => {
                if (error.response ){
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                console.error(error);
                }
            });
}
    
putData();