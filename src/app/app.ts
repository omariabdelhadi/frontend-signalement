import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { NgFor, NgIf } from '@angular/common';
import { UserServer } from './servers/user-server';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, NgFor, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public Userserver:UserServer) {}
  protected readonly title = signal('test');
}
