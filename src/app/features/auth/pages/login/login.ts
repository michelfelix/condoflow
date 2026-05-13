import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  loginForm!: FormGroup;
  
  onLogin(): void {
    
    if (this.loginForm.invalid) {
      return;
    }

    console.log(this.loginForm.value);

    this.authService.login();

    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {

    this.authService.isLoggedIn$.subscribe(value => {
      console.log('Usuário logado?', value);
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
}