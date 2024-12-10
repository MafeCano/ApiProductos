import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: any; // Almacenará la información del producto

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el ID del producto desde la URL
    this.apiService.getProductById(productId).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        alert('Error al obtener el detalle del producto:')
        console.error('Error al obtener el detalle del producto:', err);
      }
    });
  }
}
