import { urlOperacoesBancariasSacar, urlOperacoesBancariasDepositar } from './../../app.api';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urlDataDomain, urlOperacoesBancariasSaldo } from '../../app.api';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Conta } from '../model/Conta.model';

@Injectable()
export class PageService {
  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  public Saldo(conta: Conta): Observable<any> {
    return this.http.get(`${urlDataDomain}${urlOperacoesBancariasSaldo}?banco=${conta.BancoContaCli}&agencia=${conta.AgenciaContaCli}&numeroConta=${conta.NumeroContaCli}&cpf=${conta.CpfCli}`)
      .pipe(map((response) => response))
      .pipe(catchError((error) => error));
  }

  public Sacar(conta: Conta, valorSacar: number): any {
    return this.http.post(`${urlDataDomain}${urlOperacoesBancariasSacar}?ValorSacar=${valorSacar}`, JSON.stringify(conta),
      { headers: this.headers })
      .pipe(map((response) => response))
      .pipe(catchError((error) => error));
  }

  public Depositar(conta: Conta, valorDepositar: number, arrayNotasDeposito: string): any {
    return this.http.post(`${urlDataDomain}${urlOperacoesBancariasDepositar}?valorDepositar=${valorDepositar}&notasDepositadas=${arrayNotasDeposito}`, JSON.stringify(conta),
      { headers: this.headers })
      .pipe(map((response) => response))
      .pipe(catchError((error) => error));
  }
}
