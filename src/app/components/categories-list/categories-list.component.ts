import { Component,OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent implements OnInit{

  categories: any[] = [];
  isAuthenticated: boolean = false;

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isUserAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated; // Cambiar el estado de autenticación
      }
    );
    this.loadCategories();
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        alert('Error al obtener las categorías:');
        console.error(err);
      }
    });
  }


  deleteCategory(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      this.apiService.deleteCategory(id).subscribe({
        next: () => {
          alert('Categoría eliminada exitosamente');
          this.loadCategories();  // Recarga la lista de categorías después de eliminar
        },
        error: (err) => {
          console.error('Error al eliminar la categoría:', err);
        }
      });
    }
  }
}
