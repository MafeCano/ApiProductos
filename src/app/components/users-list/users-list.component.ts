import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: any[] = [];
  isLoading = false; // Para gestionar estados de carga

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  // Obtener la lista de usuarios
  getUsers(): void {
    this.isLoading = true;
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener los usuarios:', err);
        alert('Hubo un problema al cargar la lista de usuarios.');
        this.isLoading = false;
      }
    });
  }

  // Eliminar un usuario
  deleteUser(userId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.apiService.deleteUser(userId).subscribe({
        next: () => {
          alert('Usuario eliminado exitosamente');
          // Elimina el usuario localmente para evitar recargar toda la lista
          this.users = this.users.filter(user => user.id !== userId);
        },
        error: (err) => {
          console.error('Error al eliminar el usuario:', err);
          alert('Hubo un error al eliminar el usuario. Por favor, inténtalo de nuevo.');
        }
      });
    }
  }
}
