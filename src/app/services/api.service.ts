import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Decorador @Injectable para que este servicio pueda ser inyectado en otros componentes o servicios
@Injectable({
  providedIn: 'root' // Proporciona el servicio en el nivel raíz, disponible en toda la aplicación
})
export class ApiService {

  private apiUrl = 'https://api.escuelajs.co/api/v1'; // URL base de la API

  // Inyección de dependencias para usar HttpClient en las solicitudes HTTP
  constructor(private http: HttpClient) {}

  // Métodos para productos

  // Obtiene una lista de productos
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`); // Solicitud GET para obtener todos los productos
  }

  // Obtiene un producto específico por su ID
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/${id}`); // Solicitud GET para un producto por ID
  }

  // Crea un nuevo producto
  createProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/products`, product); // Solicitud POST para crear un producto
  }

  // Actualiza un producto existente por su ID
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/products/${id}`, product); // Solicitud PUT para actualizar un producto
  }

  // Elimina un producto existente por su ID
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/products/${id}`); // Solicitud DELETE para eliminar un producto
  }

  // Métodos para categorías

  // Obtiene una lista de categorías
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`); // Solicitud GET para obtener todas las categorías
  }

  // Obtiene una categoría específica por su ID
  getCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categories/${id}`); // Solicitud GET para una categoría por ID
  }

  // Crea una nueva categoría
  createCategory(category: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/categories`, category); // Solicitud POST para crear una categoría
  }

  // Actualiza una categoría existente por su ID
  updateCategory(id: number, category: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/categories/${id}`, category); // Solicitud PUT para actualizar una categoría
  }

  // Elimina una categoría existente por su ID
  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/categories/${id}`); // Solicitud DELETE para eliminar una categoría
  }

  // Métodos para usuarios

  // Obtiene una lista de usuarios
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`); // Solicitud GET para obtener todos los usuarios
  }

  // Obtiene un usuario específico por su ID
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`); // Solicitud GET para un usuario por ID
  }

  // Crea un nuevo usuario
  createUser(user: any): Observable<any> {
    // Asegurarse de que la URL sea correcta para la creación de usuarios
    return this.http.post<any>(`${this.apiUrl}/users`, user); // Solicitud POST para crear un usuario
  }

  // Actualiza un usuario existente
  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${user.id}`, user); // Solicitud PUT para actualizar un usuario
  }

  // Elimina un usuario existente por su ID
  deleteUser(userId: number): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}`); // Solicitud DELETE para eliminar un usuario
  }

  
}
