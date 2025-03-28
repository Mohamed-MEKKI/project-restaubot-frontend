import api  from '../api/apiClient';


async function getData(params) {
    await api.get('http://127.0.0.1:7000/')
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
    await api.post('http://127.0.0.1:7000/')
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

async function putData(params) {
    await api.put('http://127.0.0.1:7000/items',{item_id: 1})
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
    
putData();