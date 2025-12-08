import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-user',
  imports: [RouterLink],
  templateUrl: './dashboard-user.html',
  styleUrl: './dashboard-user.css',
})
export class DashboardUser {
  user = JSON.parse(localStorage.getItem("user") || '{}');
  formPasswordVisible = false;
  openFormPassword() {
  this.formPasswordVisible = true;
  }
  formVisible = false;

  openForm() {
    console.log('BlogBogota.openForm called');
    this.formVisible = true;
  }

  closeForm() {
    this.formVisible = false;
    this.formPasswordVisible = false;
  }
}
