import { LoginService } from './service/login.service';
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { Conta } from "../page/model/Conta.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  contaUsario: Conta;

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      inputCpf: new FormControl(""),
      inputSenha: new FormControl("")
    });
    this.contaUsario = new Conta();
  }

  ListarUsuario(cpf: number) {
    this.loginService.ListarUsario(cpf).subscribe((data: any) => {
      this.contaUsario.BancoContaCli = data.Data.substr(17, 3);
      this.contaUsario.AgenciaContaCli = data.Data.substr(39, 4);
      this.contaUsario.NumeroContaCli = data.Data.substr(61, 8);
      this.contaUsario.SaldoConta = data.Data.substr(83, 12);
      this.contaUsario.CpfCli = data.Data.substr(105, 11);
      this.contaUsario.Nome_cliente = data.Data.substr(133, 40);
      this.loginService.updatedDataSelection(this.contaUsario);
    });
  }

  Login() {
    let cpf: number = Number(this.loginForm.get("inputCpf").value);
    let senha: number = Number(this.loginForm.get("inputSenha").value);

    this.loginService.Login(cpf, senha).subscribe(async (data: any) => {
      if (!data.Data) {
        this.error = "CPF ou senha inválidos";
        return;
      }
      this.ListarUsuario(cpf);
      await this.router.navigate(["/aplicacao"]);
    });
  }
}
