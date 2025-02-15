import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module'; 
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule, // Importer les routes du tableau de bord
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class DashboardModule {}
