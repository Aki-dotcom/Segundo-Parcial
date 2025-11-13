import { Component } from '@angular/core';
import { ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MyBook } from '../model/book.model';
import { BookService } from '../service/book-service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-componente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './componente.html',
  styleUrl: './componente.css',
})
export class Componente {
  object: MyBook[] = [];
  error: string = '';

  @ViewChild('modalAdd') modalAdd!: ElementRef;
  @ViewChild('modalEdit') modalEdit!: ElementRef;

  selectedObject: MyBook = {
    id: 0, title: '', author: '', year: 0, genre: '', pages: 0, description: ''
  };

  newObject: MyBook = {
    id: 0, title: '', author: '', year: 0, genre: '', pages: 0, description: ''
  };

  constructor(
    private objectService: BookService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.objectService.getAll().subscribe({
      next: (datos) => {
        this.object = datos;
      },
      error: () => {
        this.error = 'Error al cargar';
        this.object = [];
      }
    });
  }

  saveObject() {
    this.objectService.addObject(this.newObject).subscribe(
      (response: MyBook) => {
        this.object.push(response);
      },
      (error) => {
        console.error('Error saving user:', error);
        alert('Error saving user. Check console.');
      }
    );
  }

  openEditModal(item: MyBook) {
    this.selectedObject = { ...item };
    this.renderer.setStyle(this.modalEdit.nativeElement, 'display', 'block');
    this.modalEdit.nativeElement.classList.add('show');
  }

  closeEditModal() {
    this.renderer.setStyle(this.modalEdit.nativeElement, 'display', 'none');
    this.modalEdit.nativeElement.classList.remove('show');
  }

  modifyObject() {
    this.objectService.putObject(this.selectedObject).subscribe({
      next: (res) => {
        const index = this.object.findIndex(u => u.id === res.id);
        if (index !== -1) {
          this.object[index] = res;
        }
        this.closeEditModal();
      },
      error: () => alert('Error editando usuario')
    });
  }

  removeObject(id: number) {
    this.object = this.object.filter(u => u.id !== id);
  }
}
