import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent {
  category = { name: '', imageUrl: '' };  // Almacena los datos de la nueva categoría

  constructor(private apiService: ApiService, private router: Router) {}

  addCategory(): void {
    if (this.category.imageUrl) {
      // Llamar al servicio para crear la categoría
      this.apiService.createCategory(this.category).subscribe({
        next: () => {
          alert('Categoría añadida exitosamente');
          this.router.navigate(['/categories']);
        },
        error: (err) => {
          console.error('Error al añadir la categoría:', err);
        }
      });
    } else {
      alert('Por favor ingresa una URL de imagen.');
    }
  }
}
