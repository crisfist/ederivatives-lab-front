import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    "username": '',
    "password": ''
  }

  constructor(private snack:MatSnackBar, private loginService:LoginService, private router:Router) { }

  ngOnInit() {
  }

  formSubmit(){
    if(this.loginData.username.trim() == '' || this.loginData.username == null){
      this.snack.open('El nombre de usuario es requerido !!', 'Aceptar', {
        duration: 3000
      });
      return;
    }

    if(this.loginData.password.trim() == '' || this.loginData.password == null){
      this.snack.open('La contraseña de usuario es requerido !!', 'Aceptar', {
        duration: 3000
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) =>{      
        console.log(data);  
        this.loginService.loginUser(data.token); 
        this.loginService.getCurrentUser().subscribe((user:any)=>{
          this.loginService.setUser(user);
          console.log(user); 
          
          if(this.loginService.getUserRole() == "ADMIN"){
            //Dashboard admin
            //window.location.href = '/admin';
            this.router.navigate(['admin']);
            this.loginService.loginStatusSubject.next(true);
          }else{
            //Dashboard user
            //window.location.href = '/user';
            this.router.navigate(['user-dashboard']);
            this.loginService.loginStatusSubject.next(true);
          }
        });
      }, (error)=> {
        console.log(error); 
        this.snack.open('Detalles invalidos, vuelva a intentarlo!!', 'Aceptar', {
          duration: 3000
        });
      }    
    );
  }

}
