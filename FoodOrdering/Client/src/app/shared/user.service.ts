import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient){}

  SignUpService(values: any){
    return this.http.post(environment.apiBaseUrl + '/User/Register', values);
  }

  LoginService(values){
    return this.http.post(environment.apiBaseUrl + '/User/Login', values);
  }

  getUserProfileService(){
    return this.http.get(environment.apiBaseUrl + '/UserProfile');
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    for(let i  = 0; i < allowedRoles.length; i++){
      if(userRole == allowedRoles[i]){
        isMatch = true;
      }return false;
    }
    return isMatch
  }
}
