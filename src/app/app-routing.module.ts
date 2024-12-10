import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductDeleteComponent } from './components/product-delete/product-delete.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserDeleteComponent } from './components/user-delete/user-delete.component';

const routes: Routes = [
  {path: 'products', component: ProductsListComponent},
  {path: 'product-detail/:id', component: ProductDetailComponent},
  {path: 'product-create', component: ProductCreateComponent},
  {path: 'products-edit/:id', component: ProductEditComponent},
  {path: 'product-delete/:id', component: ProductDeleteComponent},
  {path: 'categories', component: CategoriesListComponent},
  {path: 'category-edit/:id', component: CategoryEditComponent},
  {path: 'category-create', component: CategoryCreateComponent},
  {path: 'login', component: LoginComponent},
  { path: 'users', component: UsersListComponent },
  { path: 'user-create', component: UserCreateComponent },
  { path: 'user-edit/:id', component: UserEditComponent },  
  { path: 'user/delete/:id', component: UserDeleteComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
