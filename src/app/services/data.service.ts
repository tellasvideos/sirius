import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // To get all users
  API_GET_USERS_URL = 'http://strongboxao.ddns.net:8022/accounts/users/'

  constructor(private http: HttpClient) { }

  listUsers(){
    return this.http.get<Users>(this.API_GET_USERS_URL);
  }
}
