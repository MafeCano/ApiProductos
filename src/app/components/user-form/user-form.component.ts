import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  user: any = { name: '', email: '' };
  isEditMode: boolean = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    if (userId) {
      this.isEditMode = true;
      this.apiService.getUserById(userId).subscribe({
        next: (data) => this.user = data,
        error: (err) => console.error('Error al cargar usuario:', err)
      });
    }
  }

  submitForm(): void {
    if (this.isEditMode) {
      // En el modo de edición, se debe enviar solo el objeto user
      this.apiService.updateUser(this.user).subscribe({
        next: () => {
          alert('Usuario actualizado correctamente');
          this.router.navigate(['/users']);
        },
        error: (err) => console.error('Error al actualizar usuario:', err)
      });
    } else {
      // En el modo de creación, creamos un nuevo usuario
      this.apiService.createUser(this.user).subscribe({
        next: () => {
          alert('Usuario creado correctamente');
          this.router.navigate(['/users']);
        },
        error: (err) => console.error('Error al crear usuario:', err)
      });
    }
  }
}