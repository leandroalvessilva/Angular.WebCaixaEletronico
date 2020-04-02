import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { SacarModel } from './../../model/Sacar.model';
import { Conta } from './../../model/Conta.model';
import { Component, OnInit, OnChanges } from '@angular/core';
import { LoginService } from '../../../login/service/login.service';
import { PageService } from '../../services/page.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-depositar',
  templateUrl: './depositar.component.html',
  styleUrls: ['./depositar.component.css']
})
export class DepositarComponent implements OnInit, OnChanges {

  contaUsuario: Conta;
  sacarModel: SacarModel;
  depositarForm: FormGroup;

  constructor(private loginService: LoginService, private pageService: PageService,
    private fb: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.depositarForm = this.fb.group({
      inputValorDepositar: new FormControl({value: '0', disabled: true}),
      inputValorCemReais: new FormControl(0),
      inputValorCinquentaReais: new FormControl(0),
      inputValorVinteReais: new FormControl(0),
      inputValorDezReais: new FormControl(0)
    });

    this.contaUsuario = new Conta();
    this.sacarModel = new SacarModel();
    this.ListarUsuario();
  }

  ngOnChanges(): void {

  }

  SetarValorDeposito()
  {
      this.depositarForm.get('inputValorDepositar').setValue(this.depositarForm.get('inputValorCemReais').value * 100);
      this.depositarForm.get('inputValorDepositar').setValue(this.depositarForm.get('inputValorDepositar').value + this.depositarForm.get('inputValorCinquentaReais').value * 50);
      this.depositarForm.get('inputValorDepositar').setValue(this.depositarForm.get('inputValorDepositar').value + this.depositarForm.get('inputValorVinteReais').value * 20);
      this.depositarForm.get('inputValorDepositar').setValue(this.depositarForm.get('inputValorDepositar').value + this.depositarForm.get('inputValorDezReais').value * 10);
  }

  ResetarCamposDeposito()
  {
    this.depositarForm.get('inputValorDepositar').setValue("0");
    this.depositarForm.get('inputValorCemReais').setValue("0");
    this.depositarForm.get('inputValorCinquentaReais').setValue("0");
    this.depositarForm.get('inputValorVinteReais').setValue("0");
    this.depositarForm.get('inputValorDezReais').setValue("0");
  }

  MontarArrayNotasDeposito()
  {
    let arrayNotasDeposito = [this.depositarForm.get('inputValorCemReais').value,
    this.depositarForm.get('inputValorCinquentaReais').value,
    this.depositarForm.get('inputValorVinteReais').value,
    this.depositarForm.get('inputValorDezReais').value]

    return arrayNotasDeposito.toLocaleString();
  }

  ListarUsuario() {
    this.loginService.data.subscribe(data => {
      this.contaUsuario = data;
    });
  }

  Depositar() {
    this.sacarModel.ValorSacar = this.depositarForm.get('inputValorDepositar').value == '' ? this.depositarForm.get('inputValorDepositar').value : this.depositarForm.get('inputValorDepositar').value.toFixed(2);

    this.pageService.Depositar(this.contaUsuario, parseFloat(this.sacarModel.ValorSacar), this.MontarArrayNotasDeposito()).subscribe((data: any) => {
      if(data.Codigo == 200)
      {
        this._snackBar.open(data.Mensagem, null, {
          duration: 3000,
        });
        this.ResetarCamposDeposito();
      }
      else{
        this._snackBar.open(data.Mensagem, null, {
          duration: 5000,
        });
      }
    });
  }

  QuantidadeNotas(notas: string) {
    if(notas.length == 2)
    {
      return false;
    }
    return true;
  }
}
