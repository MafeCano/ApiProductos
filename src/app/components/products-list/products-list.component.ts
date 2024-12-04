import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit{
  products: any[] = []; 
  isAuthenticated: boolean = false;

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isUserAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
      }
    );
    this.getProducts();
  }

  getProducts(): void {
    this.apiService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });
  }

  // Función para eliminar un producto
  deleteProduct(productId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.apiService.deleteProduct(productId).subscribe({
        next: () => {
          // Eliminar el producto de la lista localmente
          this.products = this.products.filter((product) => product.id !== productId);
          console.log('Producto eliminado');
        },
        error: (err) => {
          console.error('Error al eliminar el producto:', err);
        },
      });
    }
  }
}
