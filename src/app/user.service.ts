import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	private baseUrl = 'http://localhost:8080/';  
  
  constructor(private http:HttpClient) { }  

 createUser(user: object): Observable<object> { 

    return this.http.post(`${this.baseUrl}/saveuser`, user);  
  }

   updateUser(id:number,user: object): Observable<object> { 

    return this.http.post(`${this.baseUrl}/updateuser/${id}`, user);  
  }


  getUserList(): Observable<any> {  
    return this.http.get(`${this.baseUrl}`+'userlist');  
  }  

  getUser(id: number): Observable<Object> {  
    return this.http.get(`${this.baseUrl}/getUser/${id}`);  
  }

  deleteUser(id: number): Observable<any> {  
    return this.http.delete(`${this.baseUrl}/deleteuser/${id}`, { responseType: 'text' });  
  }   
}
