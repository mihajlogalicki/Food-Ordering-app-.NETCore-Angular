import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service : UserService, private router: Router) { }

    public UserName: string;
    public Password: string;
    public wrongCredentials: string;

    Login(){
      var body = {
        UserName: this.UserName,
        Password: this.Password
      };
      this.service.LoginService(body).subscribe((res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/home');
          console.log(res);
      }, err => {
        if(err.status == 400){
          this.wrongCredentials = "Username or Password is incorrect";
        }
      });
    }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.router.navigate(['/home']);
    }
  }

}
