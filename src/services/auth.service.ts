import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

const API_URL = "http://127.0.0.1:8000/";

export type CurrentUser = {
    full_name: string,
    email: string,
    access_token: string,
    refresh_token: string,
    pk: string,
    is_company: boolean,
    bonus: number
}

const currentUserSubject = new BehaviorSubject<CurrentUser | null>(JSON.parse(localStorage.getItem('currentUser')!));


const registerUser = (fullName: string, email: string, password: string) => {
    return axios.post(API_URL + "register", {
        fullName,
        email,
        password,
    })
        .then((response: any)=> {
            // if (response.data.accessToken) {
            //     const user: CurrentUser = {
            //         full_name: response.data.full_name,
            //         email: response.data.email,
            //         access_token: response.data.access_token,
            //         refresh_token: response.data.refresh_token,
            //         pk: response.data.pk,
            //     }
            //     localStorage.setItem("currentUser", JSON.stringify(user));
            //     currentUserSubject.next(user);
            // }
            //
            // return response.data;
        });
};

const registerCompany = (full_name: string, is_company: boolean, email: string, password: string, company_location: string) => {
    // return axios.post(API_URL + "register", {
    //     full_name,
    //     isC,
    //     email,
    //     password,
    // })
    //     .then((response: any)=> {
    //         // const user: CurrentUser = {
    //         //     full_name: response.data.full_name,
    //         //     email: response.data.email,
    //         //     access_token: response.data.access_token,
    //         //     refresh_token: response.data.refresh_token,
    //         //     pk: response.data.pk,
    //         // }
    //         // if (response.data.accessToken) {
    //         //     localStorage.setItem("currentUser", JSON.stringify(user));
    //         //     currentUserSubject.next(user);
    //         // }
    //         //
    //         // return response.data;
    //     });
};

const login = (email: string, password: string) => {
    return axios
        .post(API_URL + "login", {
            email,
            password,
        })
        .then((response:any) => {
            if (response.data.access_token) {
                const user: CurrentUser = {
                    full_name: response.data.full_name,
                    email: response.data.email,
                    access_token: response.data.access_token,
                    refresh_token: response.data.refresh_token,
                    pk: response.data.pk,
                    is_company: response.data.is_company,
                    bonus: response.data.bonus
                };
                localStorage.setItem("currentUser", JSON.stringify(user));
                currentUserSubject.next(user);
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
};

const getCurrentUserValue = () => {
    return currentUserSubject.value
}



export const authenticationService = {
    registerCompany,
    registerUser,
    login,
    getCurrentUserValue,
    logout,
    currentUser: currentUserSubject.asObservable(),
};