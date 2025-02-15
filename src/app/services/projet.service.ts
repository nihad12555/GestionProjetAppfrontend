import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateProjectDto, ProjectDto, UpdateProjectDto } from '../Dtos/ProjetDTO';


@Injectable({
  providedIn: 'root',
})
export class ProjetService {
  private apiUrl = 'http://localhost:5074/api/Project';
  
    constructor(private http: HttpClient) {}
  
    getProjects(): Observable<ProjectDto[]> {
      return this.http.get<ProjectDto[]>(this.apiUrl);
    }
  
    addProject(Project: CreateProjectDto): Observable<ProjectDto> {
      return this.http.post<ProjectDto>(this.apiUrl, Project);
    }
  
    updateProject(id: number, Project: UpdateProjectDto): Observable<ProjectDto> {
      return this.http.put<ProjectDto>(`${this.apiUrl}/${id}`, Project);
    }
  
    deleteProject(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  }
  