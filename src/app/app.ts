import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLinkWithHref, CommonModule, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {  
  currentDate = new Date();

  constructor(){
    setInterval(()=>{
      this.currentDate = new Date();
    },1000);
  }
}
