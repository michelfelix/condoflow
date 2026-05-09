import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  constructor(private authService: AuthService) {}

  onLogin(): void {
    this.authService.login();
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(value => {
      console.log('Usuário logado?', value);
    });
  }
}