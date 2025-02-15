import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateProjectDto, ProjectDto } from '../../Dtos/ProjetDTO';
import { ProjetService } from '../../services/projet.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent implements OnInit {
goToTaches() {
  this.router.navigate(['/taches']);
}
  projects: ProjectDto[] = [];
  @Output() projectSelected = new EventEmitter<ProjectDto>();
  showAddProjectForm = false; // ✅ Contrôle l'affichage du formulaire
  newProjectName = '';
  newProjectDescription = '';
  newProjectStatus = 'En cours';
  newProjectStartDate = '';
  newProjectEndDate = '';
  newProjectPriority = 'Moyenne';

  constructor(private projetService: ProjetService, private router : Router) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    // Charger les projets depuis le localStorage
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      this.projects = JSON.parse(savedProjects);
    }
  
    // Charger les projets depuis le backend (optionnel)
    this.projetService.getProjects().subscribe((data) => {
      this.projects = data;
  
      // Sauvegarder les projets dans le localStorage après chargement depuis le backend
      localStorage.setItem('projects', JSON.stringify(this.projects));
    });
  }

  addProject(): void {
    const newProject: CreateProjectDto = {
      name: this.newProjectName,
      description: this.newProjectDescription,
      status: this.newProjectStatus,
      startDate: new Date(this.newProjectStartDate).toISOString(),
      endDate: new Date(this.newProjectStartDate).toISOString(),
      priority: this.newProjectPriority

    };
    console.log("Données envoyées au backend :", newProject);

    this.projetService.addProject(newProject).subscribe((project) => {
      this.projects.push(project);
      
      // Sauvegarder les projets dans le localStorage
      localStorage.setItem('projects', JSON.stringify(this.projects));
      this.newProjectName = '';
      this.newProjectDescription = '';
      this.newProjectStatus='En cours';
      this.newProjectStartDate= '';
      this.newProjectEndDate= '';
      this.newProjectPriority= 'Moyenne';
      this.showAddProjectForm = false; // ✅ Ferme le formulaire après ajout
    },

    (error) => {
      console.error("Erreur lors de l'ajout du projet :", error);
    }
  );
  }

  selectProject(project: ProjectDto): void {
    this.projectSelected.emit(project); // Émettre l'événement avec le projet sélectionné
  }
}
