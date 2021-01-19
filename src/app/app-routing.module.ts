import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { RegistryComponent } from './pages/registry/registry.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './pages/home/navbar/navbar.component';
import { SidebarComponent } from './pages/home/admin/sidebar/sidebar.component';
import { AuthGuard } from './guards/auth.guard';
import { LinesComponent } from './pages/home/graphics/lines/lines.component';

const routes: Routes = [
  { path: 'registry',     component: RegistryComponent },
  { path: 'login'   ,     component: LoginComponent},
  { path: 'navbar',       component: NavbarComponent },
  { path: 'adminSidebar', component: SidebarComponent, canActivate: [ AuthGuard ] },
  { path: 'lines', component: LinesComponent, canActivate: [ AuthGuard ] },
  { path: '**', redirectTo: 'login' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
