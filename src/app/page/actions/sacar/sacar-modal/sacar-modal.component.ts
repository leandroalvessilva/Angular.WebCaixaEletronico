import { SacarModel } from './../../../model/Sacar.model';
import { Component, OnInit, Input, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-sacar-modal',
  templateUrl: './sacar-modal.component.html',
  styleUrls: ['./sacar-modal.component.css']
})
export class SacarModalComponent implements OnInit {

  informacoesSacar: SacarModel;

  constructor(public dialogRef: MatDialogRef<SacarModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.montarInformacoes();
  }

  montarInformacoes()
  {
    this.informacoesSacar = this.data.data;
    this.informacoesSacar.ValorSacar = parseFloat(this.informacoesSacar.ValorSacar).toFixed(2).replace('.',',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
    this.informacoesSacar.SaldoAtual = parseFloat(this.informacoesSacar.SaldoAtual).toFixed(2).replace('.',',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
  }

  close() {
    this.dialogRef.close();
  }
}
