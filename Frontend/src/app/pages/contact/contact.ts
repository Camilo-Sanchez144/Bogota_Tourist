import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  submitForm() {
    console.log('Formulario enviado:', this.formData);
    alert('Gracias por contactarnos. Te responderemos pronto.');
    this.formData = { name: '', email: '', message: '' };
  }
}
