import { Component } from '@angular/core';
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { ProjectDto } from '../Dtos/ProjetDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  selectedProject: ProjectDto | null = null; 
  onProjectSelected(project: ProjectDto): void {
    this.selectedProject = project;
  }
}
