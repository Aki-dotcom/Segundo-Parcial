import { Component, signal } from '@angular/core';
import { Componente } from './componente/componente';

@Component({
  selector: 'app-root',
  standalone: true,         
  imports: [Componente],     
  template: `<app-componente></app-componente>`,
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('Parcial');
}
