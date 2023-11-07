import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../user.service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  formReg: FormGroup;

  constructor(
    private userService: UserServiceService,
    private router: Router
  ){
    this.formReg = new FormGroup({
     email: new FormControl('', [Validators.required, Validators.email]),
     password: new FormControl('', [Validators.required, Validators.minLength(8)]), 
    })
  }


  ngOnInit(): void {
      
  }

  onSubmit() {
    if (this.formReg.valid) {
      // El formulario es válido, puedes continuar con la lógica de registro.
      const userData = this.formReg.value; // Obtén los datos del formulario
  
      this.userService.register(userData)
        .then(response => {
          console.log(response);
          // Redirige a la página de inicio de sesión u otra página deseada
          this.router.navigate(['/login']);
        })
        .catch(error => {
          console.log(error);
          // Maneja el error, muestra un mensaje de error o realiza otras acciones necesarias
        });
    } else {
      // El formulario no es válido, muestra mensajes de error al usuario o toma otras acciones necesarias
      console.log('El formulario es inválido. Por favor, corrige los campos.');
    }
  }

}
