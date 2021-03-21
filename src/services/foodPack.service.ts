import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

const API_URL = "http://localhost:8080/api/food/";


// // const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')!));
//
//
// const ge = (id: fullName: string, email: string, password: string) => {
//     return axios.post(API_URL + "register/user", {
//         fullName,
//         email,
//         password,
//     })
//         .then((response: any)=> {
//             if (response.data.accessToken) {
//                 localStorage.setItem("currentUser", JSON.stringify(response.data));
//                 currentUserSubject.next(response.data);
//             }
//
//             return response.data;
//         });
// };