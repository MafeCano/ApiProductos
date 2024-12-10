import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service'; // Asegúrate de importar el servicio correctamente
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {
  user = {
    name: '',
    email: '',
    password: '',
    avatar: ['']
  }

  constructor(private apiService: ApiService, private router: Router){}

  createUser(){
    this.apiService.createUser(this.user).subscribe({
      next: (data)=>{
        alert('Usuario creado exitosamente');
        this.router.navigate(['/users']);
      },
      error:(err)=>{
        alert('No fue posible crear el Usuario');
        console.error('Error al crear el usuario', err);
      }
    })
  }
  }

