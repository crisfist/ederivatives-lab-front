import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user:any = null;

  isAdmin = false;
  isSearchingPrice = false;
  isProducts = false;
  isPosition = false;

  constructor(public login:LoginService) {

   }

  ngOnInit() {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      }
    );
  }

  public logout(){
    this.login.logout();
    window.location.reload();
  }

  public adminHeader(){
    this.isAdmin = true;
    this.isSearchingPrice = false;
    this.isProducts = false;
    this.isPosition = false;
  }

  public searchPriceHeader(){
    this.isSearchingPrice = true;
    this.isAdmin = false;
    this.isProducts = false;
    this.isPosition = false;
  }

  public productsHeader(){
    this.isProducts = true;
    this.isAdmin = false;
    this.isSearchingPrice = false;
    this.isPosition = false;
  }

  public positionHeader(){
    this.isPosition = true;
    this.isAdmin = false;
    this.isSearchingPrice = false;
    this.isProducts = false;
  }

}
