import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  resultado: number | null = null;

  constructor(private http: HttpClient) {
    this.http.get<any>('http://backend:3000/api/test').subscribe(data => {
      this.resultado = data.result;
    });
  }
}
