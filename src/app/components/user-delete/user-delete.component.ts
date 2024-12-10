import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service'; // Asegúrate de importar el servicio
import { ActivatedRoute, Router } from '@angular/router'; 

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.css'
})
export class UserDeleteComponent {
 userId: number | null = null;
  userName: string = '';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userId = parseInt(userId, 10);
      this.getUserDetails(this.userId);
    }
  }

  // Obtener detalles del usuario para mostrar el nombre
  getUserDetails(userId: number): void {
    this.apiService.getUserById(userId).subscribe({
      next: (data) => {
        this.userName = data.name;
      },
      error: (err) => {
        console.error('Error al obtener el usuario:', err);
      }
    });
  }

  // Método para eliminar el usuario
  deleteUser(): void {
    if (this.userId !== null && confirm(`¿Estás seguro de que deseas eliminar el usuario ${this.userName}?`)) {
      this.apiService.deleteUser(this.userId).subscribe({
        next: () => {
          alert('Usuario eliminado exitosamente');
          // Redirigir a la lista de usuarios
          this.router.navigate(['/users']);
        },
        error: (err) => {
          console.error('Error al eliminar el usuario:', err);
          alert('Hubo un error al eliminar el usuario');
        }
      });
    }
  }
}
