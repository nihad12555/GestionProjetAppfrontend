import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateTacheDTO, UpdateTacheDto} from '../Dtos/TacheDTO';


@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private apiUrl = 'http://localhost:5074/api/taches';

  constructor(private http: HttpClient) {}

  getTaches(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createTache(tache: CreateTacheDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, tache);
  }

  updateTache(id: number, tache: UpdateTacheDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, tache);
  }

  deleteTache(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
