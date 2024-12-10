import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  category = { name: '', image: '' };  // Añadido el campo de imagen

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory(): void {
    const categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.apiService.getCategoryById(categoryId).subscribe({
      next: (data) => {
        this.category = data;
      },
      error: (err) => {
        alert('Error al cargar la categoria');
        console.error('Error al cargar categoría:', err);
      }
    });
  }

  updateCategory(): void {
    const categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.apiService.updateCategory(categoryId, this.category).subscribe({
      next: () => {
        alert('Categoría actualizada exitosamente');
        this.router.navigate(['/categories']);
      },
      error: (err) => {
        console.error('Error al actualizar categoría:', err);
      }
    });
  }
}
