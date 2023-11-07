import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserServiceService } from '../user.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 formLogin : FormGroup

 constructor(
  private userService: UserServiceService,
  private router: Router
 ){
  this.formLogin = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })
 }

 ngOnInit(): void {}

 onSubmit(){
  this.userService.login(this.formLogin.value)
  .then(response => {
    console.log(response);
    this.router.navigate(['/dashboard-admin'])
  })
  .catch(error => console.log(error));
 }
 sesionConGoogle(){
  this.userService.loginWithGoogle()
  .then(response => {
    console.log(response);
    this.router.navigate(['/dashboard-admin'])
  }) 
  .catch(error => console.log(error))
 }


}
