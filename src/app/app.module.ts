import { DepositarModalComponent } from './page/actions/depositar/depositar-modal/depositar-modal.component';
import { SacarModalComponent } from './page/actions/sacar/sacar-modal/sacar-modal.component';
import { PageService } from './page/services/page.service';
import { DepositarComponent } from './page/actions/depositar/depositar.component';
import { SacarComponent } from './page/actions/sacar/sacar.component';
import { SaldoComponent } from './page/actions/saldo/saldo.component';
import { LoginService } from './login/service/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Renderer2 } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CustomMaterialModule } from './material.module';
import { PageComponent } from './page/page.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { AuthGuard } from './guards/auth.guard';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left", allowNegative: true, decimal: ",", precision: 2, prefix: "R$ ",  suffix: "", thousands: "." };

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    LoginComponent,
    SaldoComponent,
    SacarComponent,
    SacarModalComponent,
    DepositarComponent,
    DepositarModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxMaskModule.forRoot(options),
    CurrencyMaskModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CustomMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [LoginService,PageService,AuthGuard,{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
