import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TachesComponent } from './taches.component';


const routes: Routes = [
  { path: 'taches', component: TachesComponent },
  { path: '', redirectTo: '/taches', pathMatch: 'full' }, // Rediriger vers tâches par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TacheRoutingModule { }