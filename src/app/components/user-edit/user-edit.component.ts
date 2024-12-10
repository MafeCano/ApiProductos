import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {
  user: any = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getUser(id);
    }
  }

  getUser(id: string): void {
    this.apiService.getUserById(+id).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Error al obtener el usuario:', err);
        alert('Hubo un error al cargar los datos del usuario');
      }
    });
  }

  updateUser(): void {
    this.apiService.updateUser(this.user).subscribe({
      next: (data) => {
        console.log('Usuario actualizado:', data);
        alert('Usuario actualizado exitosamente');
        this.router.navigate(['/users']);
      },
      error: (err) => {
        console.error('Error al actualizar el usuario:', err);
        alert('Hubo un error al actualizar el usuario');
      }
    });
  }
}
