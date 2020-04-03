import { AuthGuard } from './guards/auth.guard';
import { DepositarComponent } from './page/actions/depositar/depositar.component';
import { SacarComponent } from './page/actions/sacar/sacar.component';
import { SaldoComponent } from './page/actions/saldo/saldo.component';
import { LoginComponent } from './login/login.component';
import { PageComponent } from './page/page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'aplicacao',
    component: PageComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      { path: 'saldo', component: SaldoComponent },
      { path: 'sacar', component: SacarComponent },
      { path: 'depositar', component: DepositarComponent }
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
