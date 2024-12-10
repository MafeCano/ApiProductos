import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl:'./product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit{
  productForm: FormGroup; // Formulario reactivo
  categories: any[] = []; // Lista de categorías

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    // Inicializa el formulario con validaciones
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
      categoryId: [null, [Validators.required]], // Se asegura que se seleccione una categoría
      images: ['', [Validators.required, Validators.pattern(/^(http|https):\/\/[^ "]+$/)]], // Valida URLs
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  // Carga las categorías desde la API
  loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      },
    });
  }

  // Método para crear un producto
  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = { ...this.productForm.value };

      // Asegúrate de que el campo de imagen sea una URL válida
      const imageUrl = formData.images.trim();

      if (!imageUrl.startsWith('http')) {
        alert('Por favor, proporciona una URL de imagen válida.');
        return;
      }

      // Verificar si el campo `images` debe ser un arreglo
      try {
        formData.images = JSON.parse(imageUrl); // Si es JSON válido, lo parsea
      } catch {
        formData.images = [imageUrl]; // Si no, lo convierte en un arreglo
      }

      // Llama al servicio para crear el producto
      this.apiService.createProduct(formData).subscribe({
        next: () => {
          alert('Producto creado exitosamente');
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error al crear el producto:', error);
          alert('Error al crear el producto.');
        },
      });
    } else {
      alert('Por favor completa todos los campos correctamente.');
    }
  }
}
