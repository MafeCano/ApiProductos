import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit{

  product = {
    title: '',
    price: 0,
    description: '',
    categoryId: 0,
    images: ['']
  };

  categories: any []= [];


  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  createProduct(): void {
    this.apiService.createProduct(this.product).subscribe({
      next: () => {
        alert('Producto creado exitosamente');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        alert('Error al crear el producto');
        console.error('Error al crear producto:', err);
      }
    });
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error al obtener las categorías:', err);
      }
    });
  }



}
