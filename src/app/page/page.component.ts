import { LoginService } from './../login/service/login.service';
import { Router } from '@angular/router';
import { Conta } from './model/Conta.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  contaUsuario: Conta;
  IsChangePage: boolean;

  constructor(
    private router: Router,
    private login: LoginService
  ) { }

  ngOnInit(): void {
    this.contaUsuario = new Conta();
    this.ListarUsuario();
    this.IsChangePage = false;
  }

  ListarUsuario() {
    this.login.data.subscribe(data => {
      this.contaUsuario = data;
    });
  }

  isChangePage(pageComponent: boolean = false) {
    pageComponent ? this.IsChangePage = false : this.IsChangePage = true;
  }

  logOut() {
    this.router.navigate(["/login"]);
  }
}
