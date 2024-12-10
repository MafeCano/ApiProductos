import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  users: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  // Obtener la lista de usuarios
  getUsers(): void {
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error al obtener los usuarios:', err);
      }
    });
  }

  // Eliminar un usuario
  deleteUser(userId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.apiService.deleteUser(userId).subscribe({
        next: () => {
          alert('Usuario eliminado exitosamente');
          this.getUsers(); // Actualizar la lista después de eliminar
        },
        error: (err) => {
          console.error('Error al eliminar el usuario:', err);
          alert('Hubo un error al eliminar el usuario');
        }
      });
    }
  }
}