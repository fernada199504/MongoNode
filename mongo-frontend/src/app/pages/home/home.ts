import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  currentYear = new Date().getFullYear();

  // Simulación de publicaciones (luego puedes conectar con un servicio)
  posts = [
    { id: 1, title: 'Primera publicación', excerpt: 'Este es un resumen corto de la publicación...' },
    { id: 2, title: 'Segunda publicación', excerpt: 'Otro resumen interesante de contenido...' },
    { id: 3, title: 'Tercera publicación', excerpt: 'Un pequeño vistazo a la publicación...' },
  ];
}
