import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AdminRegistrationRequestDto } from '../../Dtos/AdminDTO';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,  
  imports: [
    CommonModule,    
    ReactiveFormsModule  
  ]
})
export class RegisterComponent implements OnInit {
  goToLogin() {
    this.router.navigate(['/login']);
  }
  registerForm!: FormGroup;  
  loading = false;
  submitted = false;
  error = '';
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
      ]],
      //terms: [false, Validators.requiredTrue]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  getPasswordErrorMessage(): string {
    if (this.f['password'].errors) {
      if (this.f['password'].errors['required']) {
        return 'Le mot de passe est requis';
      }
      if (this.f['password'].errors['minlength']) {
        return 'Le mot de passe doit contenir au moins 6 caractères';
      }
      if (this.f['password'].errors['pattern']) {
        return 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial';
      }
    }
    return '';
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
  
    if (this.registerForm.invalid) {
      console.log('Form invalid:', this.registerForm.value);
      return;
    }
  
    this.loading = true;
  
    const registrationRequest: AdminRegistrationRequestDto = {
      fullName: this.f['fullName'].value,
      email: this.f['email'].value,
      password: this.f['password'].value
    };
  
    console.log('Sending request:', registrationRequest);
  
    this.authService.register(registrationRequest)
      .subscribe({
        next: () => {
          console.log('Registration successful!');
          this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.error = error.error?.message || 'Une erreur est survenue lors de l\'inscription';
          this.loading = false;
        }
      });
  }
  

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.submitted));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return `Ce champ est requis`;
      }
      if (field.errors['email']) {
        return `Email invalide`;
      }
      if (field.errors['minlength']) {
        return `Minimum ${field.errors['minlength'].requiredLength} caractères`;
      }
      if (fieldName === 'password') {
        return this.getPasswordErrorMessage();
      }
    }
    return '';
  }
}