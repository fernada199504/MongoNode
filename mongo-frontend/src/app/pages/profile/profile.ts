import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile {
  private auth = inject(AuthService);
  user: any = this.auth.currentUser; // traer datos del usuario

  editarPerfil() {
    alert("Función de edición en construcción 🚀");
  }
}