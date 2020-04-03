import { SacarModalComponent } from './sacar-modal/sacar-modal.component';
import { SacarModel } from './../../model/Sacar.model';
import { PageService } from './../../services/page.service';
import { Component, OnInit } from '@angular/core';
import { Conta } from '../../model/Conta.model';
import { LoginService } from '../../../login/service/login.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sacar',
  templateUrl: './sacar.component.html',
  styleUrls: ['./sacar.component.css']
})
export class SacarComponent implements OnInit {

  contaUsuario: Conta;
  sacarModel: SacarModel;
  sacarForm: FormGroup;
  dialogConfig: MatDialogConfig;
  novoArray: any;

  constructor(
    private loginService: LoginService,
    private pageService: PageService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.sacarForm = this.fb.group({
      inputValorSacar: new FormControl("")
    });

    this.novoArray = [];
    this.contaUsuario = new Conta();
    this.sacarModel = new SacarModel();
    this.ListarUsuario();

    this.dialogConfig = {
      width: '800px',
      height: '350px',
      position: { top: '13%' },
      data: { data: this.sacarModel }
    };
  }

  ListarUsuario() {
    this.loginService.data.subscribe(data => {
      this.contaUsuario = data;
      this.contaUsuario.SaldoConta = parseFloat(this.contaUsuario.SaldoConta).toFixed(2).replace('.', ',');
    });
  }

  Sacar() {
    this.sacarModel.ValorSacar = this.sacarForm.get('inputValorSacar').value == '' ? this.sacarForm.get('inputValorSacar').value : this.sacarForm.get('inputValorSacar').value.toFixed(2);

    this.pageService.Sacar(this.contaUsuario, parseFloat(this.sacarModel.ValorSacar)).subscribe((data: any) => {
      if (data.Codigo == 200) {
        this.sacarModel.SaldoAtual = data.Data.substr(92, 12);
        this.sacarModel.NotasUtilizadas = this.MontarArrayNotas(data.Data.substr(203, 13));
        this.dialog.open(SacarModalComponent, this.dialogConfig);
        this.sacarForm.get('inputValorSacar').setValue("0");
      }
      else {
        this._snackBar.open(data.Mensagem, null, {
          duration: 2000,
        });
      }
    });
  }

  MontarArrayNotas(ArrayNotasDevolvidas: string) {
    if (ArrayNotasDevolvidas.length == 12) {
      this.novoArray = ArrayNotasDevolvidas.substr(1, 10).split(',')
      return this.novoArray;
    }
    else if (ArrayNotasDevolvidas.length == 11) {
      this.novoArray = ArrayNotasDevolvidas.substr(1, 9).split(',')
      return this.novoArray;
    }
    else if (ArrayNotasDevolvidas.length == 10) {
      this.novoArray = ArrayNotasDevolvidas.substr(1, 8).split(',')
      return this.novoArray;
    }
    else if (ArrayNotasDevolvidas.length == 9) {
      this.novoArray = ArrayNotasDevolvidas.substr(1, 7).split(',');
      return this.novoArray;
    }
    this.novoArray = ArrayNotasDevolvidas.substr(1, 11).replace(']', '').split(',')
    return this.novoArray;
  }
}
