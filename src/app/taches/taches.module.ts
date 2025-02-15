import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { TacheRoutingModule } from './taches-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TacheRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class TacheModule {}