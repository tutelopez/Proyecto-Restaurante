import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../user.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 formLogin : FormGroup
errorMessage: string = '';
 constructor(
  private userService: UserServiceService,
  private router: Router
 ){
  this.formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
 }

 ngOnInit(): void {}

 onSubmit(){
  this.userService.login(this.formLogin.value)
  .then(response => {
    console.log(response);
    this.router.navigate(['/dashboard-admin'])
  })
  .catch(error => {
    console.log(error);
    this.errorMessage = 'Usuario o contraseña incorrectos'; // Mensaje de error
  });}
 sesionConGoogle(){
  this.userService.loginWithGoogle()
  .then(response => {
    console.log(response);
    this.router.navigate(['/dashboard-admin'])
  }) 
  .catch(error => console.log(error)
  )
 }


}
