import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {
  product = {
    title: '',
    price: 0,
    description: '',
    categoryId: 0,
    images: ['']
  }; // Almacenará los datos del producto

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el ID desde la URL
    this.apiService.getProductById(productId).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        console.error('Error al cargar producto:', err);
      }
    });
  }

  updateProduct(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.apiService.updateProduct(productId, this.product).subscribe({
      next: () => {
        alert('Producto actualizado exitosamente');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error al actualizar producto:', err);
      }
    });
  }
}
