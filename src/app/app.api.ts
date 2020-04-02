import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

export const urlDataDomain = environment.api;

export const urlOperacoesBancariasSaldo = environment.Saldo;
export const urlOperacoesBancariasSacar = environment.Sacar;
export const urlOperacoesBancariasDepositar = environment.Depositar;

export const urlCaixaEletronicoLogin = environment.Login;
export const urlCaixaEletronicoListarUsuario = environment.ListarUsuario;

export const httpOptions = {
    headers: new HttpHeaders ({
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
    })
};
