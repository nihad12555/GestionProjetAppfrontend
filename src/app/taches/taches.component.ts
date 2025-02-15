import { Component, OnInit } from '@angular/core';
import { CreateTacheDTO, UpdateTacheDto } from '../Dtos/TacheDTO';
import { TacheService } from '../services/Taches.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from "../components/sidebar/sidebar.component";

@Component({
  selector: 'app-taches',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, SidebarComponent],
  templateUrl: './taches.component.html',
  styleUrl: './taches.component.css'
})
export class TachesComponent implements OnInit {
  taches: any[] = [];
  nouvelleTache: CreateTacheDTO = {
    titre: '',
    description: '',
    EstTerminee: false,
    dateLimite: new Date(), // Utilisation du type Date
    responsable: '',
    projetId: 1 // ⚠️ Change selon le projet sélectionné
  };
  tacheSelectionnee: any = null;

  constructor(private tacheService: TacheService) {}

  ngOnInit(): void {
    this.chargerTaches();
  }

  // 🟢 Charger toutes les tâches
  chargerTaches(): void {
    this.tacheService.getTaches().subscribe(
      (data) => {
        this.taches = data;
        console.log('Tâches chargées:', data);
      },
      (error) => {
        console.error('Erreur lors du chargement des tâches:', error);
      }
    );
  }

  // 🟢 Ajouter une tâche
  ajouterTache(): void {
    this.tacheService.createTache(this.nouvelleTache).subscribe({
      next: (response) => {
        console.log('Tâche ajoutée', response);
        this.chargerTaches();
        this.nouvelleTache = { titre: '', description: '', EstTerminee: false, dateLimite: new Date(), responsable: '', projetId: 1 };
      },
      error: (err) => console.error('Erreur lors de l\'ajout', err)
    });
  }

  // 🟡 Sélectionner une tâche pour modification
  selectionnerTache(tache: any): void {
    this.tacheSelectionnee = { ...tache }; // Clone pour éviter la modification instantanée
  }

  // 🟡 Modifier une tâche
  modifierTache(): void {
    if (!this.tacheSelectionnee) return;
    
    const updateData: UpdateTacheDto = {
      titre: this.tacheSelectionnee.titre,
      description: this.tacheSelectionnee.description,
      EstTerminee: this.tacheSelectionnee.estTerminee,
      dateLimite: this.tacheSelectionnee.dateLimite,
      responsable: this.tacheSelectionnee.responsable,
      projetId:this.tacheSelectionnee.projetId,
    };

    this.tacheService.updateTache(this.tacheSelectionnee.id, updateData).subscribe({
      next: () => {
        console.log('Tâche modifiée');
        this.chargerTaches();
        this.tacheSelectionnee = null;
      },
      error: (err) => console.error('Erreur lors de la modification', err)
    });
  }

  //  Supprimer une tâche
  supprimerTache(id: number): void {
    if (!confirm('Voulez-vous vraiment supprimer cette tâche ?')) return;

    this.tacheService.deleteTache(id).subscribe({
      next: () => {
        console.log('Tâche supprimée');
        this.chargerTaches();
      },
      error: (err) => console.error('Erreur lors de la suppression', err)
    });
  }

}
