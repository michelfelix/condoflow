import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    this.authService.login();

    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(value => {
      console.log('Usuário logado?', value);
    });
  }
}