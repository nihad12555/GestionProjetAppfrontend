import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationAndRegistrationRoutingModule } from './login-register-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthenticationAndRegistrationRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AuthenticationAndRegistrationModule { }