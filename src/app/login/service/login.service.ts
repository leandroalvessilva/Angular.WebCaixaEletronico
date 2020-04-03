import { Conta } from './../../page/model/Conta.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlDataDomain, urlCaixaEletronicoLogin, urlCaixaEletronicoListarUsuario } from '../../app.api';
import { map, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginService {

  private dataSource = new BehaviorSubject<Conta>(null);

  data = this.dataSource.asObservable();

  constructor(private http: HttpClient) { }

  header = new Headers({ 'Content-Type': 'application/json' });

  public Login(cpf: number, senha: number): Observable<any> {
    return this.http.get(`${urlDataDomain}${urlCaixaEletronicoLogin}?cpf=${cpf}&senha=${senha}`)
      .pipe(map((response) => response))
      .pipe(catchError((error) => error));
  }

  public ListarUsario(cpf: number): Observable<any> {
    return this.http.get(`${urlDataDomain}${urlCaixaEletronicoListarUsuario}?cpf=${cpf}`)
      .pipe(map((response) => response))
      .pipe(catchError((error) => error));
  }

  updatedDataSelection(data: Conta) {
    this.dataSource.next(data);
  }
}
