import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
export interface Users {
  id: number;
  name: string;
  document: string;
  mail: string;
  direction: string;
  password: string;
  rol: number
}
export interface ResAll {
  users: Users[], 
  rol: number
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  all(){
    return this.http.get<ResAll>(`${environment.url}/api/user`)
  }

  destroy(id: number){
    return this.http.delete(`${environment.url}/api/user/destroy/${id}`);
  }

  show() {
    return this.http.get<Users>(`${environment.url}/api/user/show`);
  }

  store(user: Users) {
    return this.http.post<any>(`${environment.url}/api/user/store`, user);
  }

  edit(id: number) {
    return this.http.get<Users>(`${environment.url}/api/user/edit/${id}`);
  }

  
}
