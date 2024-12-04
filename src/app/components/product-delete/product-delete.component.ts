import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrl: './product-delete.component.css'
})
export class ProductDeleteComponent implements OnInit {
  product: any; 
  productId!: number; 

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.apiService.getProductById(this.productId).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        console.error('Error al cargar el producto:', err);
      }
    });
  }

  deleteProduct(): void {
    this.apiService.deleteProduct(this.productId).subscribe({
      next: () => {
        alert('Producto eliminado exitosamente');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error al eliminar el producto:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
