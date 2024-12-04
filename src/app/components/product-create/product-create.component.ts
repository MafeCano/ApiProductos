import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {

  product = {
    title: '',
    price: 0,
    description: '',
    categoryId: 0,
    images: ['']
  };

  constructor(private apiService: ApiService, private router: Router) {}

  createProduct(): void {
    this.apiService.createProduct(this.product).subscribe({
      next: () => {
        alert('Producto creado exitosamente');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error al crear producto:', err);
      }
    });
  }

}
