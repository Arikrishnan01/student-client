import axios from "axios";

export const GLOBAL_URL = "http://localhost:5000";

/** auth api */
export async function userRegister(data){
    return axios.post(`${GLOBAL_URL}/users/register`, data)
}

export async function userLogin(data){
    return axios.post(`${GLOBAL_URL}/users/login`, data)
}

/**get students data */
export async function getAllData() {
    return axios.get(`${GLOBAL_URL}/student/getallStudents`, {
        headers : {
            "access-token": localStorage.getItem("token"),
        },
    });
}

/** create new student data */
export async function createNewData(data) {
    return axios.post(`${GLOBAL_URL}/student/create`,data, {
        headers : {
            "access-token": localStorage.getItem("token"),
        },
    });
}