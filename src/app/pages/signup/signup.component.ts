import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user ={
    userName : '',
    password : '',
    name : '',
    surname : '',
    email : '',
    phone : ''
  }

  constructor(private userService:UserService, private snack:MatSnackBar) { }

  ngOnInit() {
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.userName == '' || this.user.userName == null){
      this.snack.open("El nombre de usuario es requerido!!", "Aceptar", {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    this.userService.añadirUsuario(this.user).subscribe(
      (data) => {
        Swal.fire('Usuario guardado', 'Usuario registrado con exito en el sistema', 'success'); 
      }, (error) =>{
        console.log(error);      
        this.snack.open("Ha ocurrido un error en el sistema", "Aceptar", {
          duration: 3000
        });
      }
    )
  }

}
