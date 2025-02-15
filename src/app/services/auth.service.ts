import { Inject, inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminAuthenticationRequestDto, AdminAuthenticationResponseDto, AdminRegistrationRequestDto, AdminRegistrationResponseDto } from '../Dtos/AdminDTO';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // L'URL de base de votre API
  private apiUrl = 'http://localhost:5074/api/auth'; 
  private http = inject(HttpClient);

  constructor(private _router: Router,
    @Inject(DOCUMENT) private document: Document) {}

  // Enregistrement de l'utilisateur
  register(user: AdminRegistrationRequestDto): Observable<AdminRegistrationResponseDto> {
    return this.http.post<AdminRegistrationResponseDto>(`${this.apiUrl}/register`, user);
  }

  // Connexion de l'utilisateur
  login(user: AdminAuthenticationRequestDto): Observable<AdminAuthenticationResponseDto> {
    return this.http.post<AdminAuthenticationResponseDto>(`${this.apiUrl}/login`, user);
  }

  isAuthenticated(): boolean {
    if (typeof localStorage === 'undefined') {
      return false; // Empêche l'erreur si localStorage n'est pas disponible
    }
    
    const token = localStorage.getItem('token');
    return token !== null;
  }
  
  
  logout(): void {
    const localStorage = document.defaultView?.localStorage;
    if(localStorage){
      localStorage.clear()
    }
    this._router.navigate(['']).then(r =>{
      alert("Utilisateur déconnecté")
    })
  }
}
