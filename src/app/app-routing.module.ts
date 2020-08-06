import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './pages/home/home.component';
import {FormationComponent} from './pages/formation/formation.component';
import {RegisterComponent} from './pages/register/register.component';
import {FormationDetailsComponent} from './pages/formation-details/formation-details.component';
import {LoginComponent} from "./pages/login/login.component";


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'formation', component: FormationComponent },
  { path: 'formation-details/:id', component: FormationDetailsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
