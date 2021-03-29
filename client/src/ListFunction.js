import axios from 'axios';

export const getList = () => {
    return axios
        .get('/users', {
            headers: {"Content-type": "application/json"}
        })
        .then(resp => {
            var data = []
            Object.keys(resp.data).forEach((key) => {
                var val = resp.data[key]
                data.push([val.id, val.nama, val.jabatan]);
            })
            return data
        })
}

export const addTodo = (term,jbt) => {
    return axios
        .post('/user_input', {
            nama: term,
            jabatan: jbt
        }, {
            headers: {"Content-type": "application/json"}
        })
        .then((resp) => {
            console.log(resp)
        })
        .catch((res) => {
            console.log(res)
        })
}

export const DeleteTodo = term => {
    axios
        .delete(`/user/${term}`, {
            headers: {"Content-type": "application/json"}
        })
        .then((resp) => {
            console.log(resp);
        })
        .catch((res) => {
            console.log(res);
        })
}

export const UpdateTodo = (jbt,term,id) => {
    return axios
        .put(`/user/${id}`, {
            nama: term,
            jabatan: jbt,
        }, {
            headers: {"Content-type": "application/json"}
        })
        .then((resp) => {
            console.log(resp);
        })
        .catch((resp) => {
            console.log(resp);
        })
}