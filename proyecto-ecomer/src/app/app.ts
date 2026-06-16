import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastComponent } from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ToastComponent],
  template: `
    <main class="main" id="top">
      <app-navbar></app-navbar>
      
      <router-outlet></router-outlet>

      <app-toast></app-toast>
    </main>
  `
})
export class App {
  title = 'proyecto-ecomer';
}
