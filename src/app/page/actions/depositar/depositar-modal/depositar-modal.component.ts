import { Component, OnInit, Inject } from '@angular/core';
import { SacarModel } from '../../../model/Sacar.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SacarModalComponent } from '../../sacar/sacar-modal/sacar-modal.component';

@Component({
  selector: 'app-depositar-modal',
  templateUrl: './depositar-modal.component.html',
  styleUrls: ['./depositar-modal.component.css']
})
export class DepositarModalComponent implements OnInit {

  informacoesSacar: SacarModel;

  constructor(public dialogRef: MatDialogRef<SacarModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.informacoesSacar = this.data.data;
  }

  close() {
    this.dialogRef.close();
  }
}
