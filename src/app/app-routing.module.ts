import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './pages/home/home.component';
import {FormationListComponent} from './page/formation-list/formation-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'formation-list', component: FormationListComponent }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}
