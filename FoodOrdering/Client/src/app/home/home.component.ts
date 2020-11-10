import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userDetails: object;

  constructor(private router: Router, private service: UserService) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  Logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  getUserProfile(){
    this.service.getUserProfileService().subscribe(data => {
      this.userDetails = data;
    });
  }
}
