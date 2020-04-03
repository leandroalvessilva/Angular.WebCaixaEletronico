import { PageService } from './../../services/page.service';
import { Conta } from './../../model/Conta.model';
import { LoginService } from './../../../login/service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.css']
})
export class SaldoComponent implements OnInit {

  contaUsuario: Conta;
  saldo: string;

  constructor(
    private loginService: LoginService,
    private pageService: PageService
  ) { }

  ngOnInit(): void {
    this.contaUsuario = new Conta();
    this.saldo = '0';
    this.GetDadosUsuario();
  }

  GetDadosUsuario(): any {
    this.loginService.data.subscribe(data => {
      this.contaUsuario = data;
      this.pageService.Saldo(data).subscribe(data => {
        this.contaUsuario.SaldoConta = this.FormatarValor(data);
      });
    });
  }

  FormatarValor(data: any) {
    let valorFormatado = parseFloat(data.Data).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
    return valorFormatado;
  }
}
