import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public message: string;

  constructor(private fb: FormBuilder,
              private service: UserService
              ){}

  formModel = this.fb.group({
    // define DB entities with default form value
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Password: ['', [Validators.required, Validators.minLength(4)]],
    ConfirmPassword: ['', Validators.required]
  }, {validator: this.comparePasswords });

  ngOnInit(): void {
  }

  comparePasswords(fb: FormGroup){
    let ConfirmPassword = fb.get('ConfirmPassword');
    let Password = fb.get('Password');   
      if(ConfirmPassword.errors == null){
        if(Password.value !== ConfirmPassword.value){
          ConfirmPassword.setErrors({
            PasswordMismatch: true
          });
        }
      }
  }

  SignUp(){

    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Password,
    };

    this.service.SignUpService(body).subscribe((res:any) => {
      if(res.succeeded){
        this.message = "Register Success!";
        this.formModel.reset();
      } else {
        for(let i = 0; i < res.errors.length; i++){
           let status = res.errors[i];
           if(status.code == "DuplicateUserName"){
            this.message = "User Already Exist!";
           }
        }
      }
      console.log(this.message);
    }) 
  }

}
