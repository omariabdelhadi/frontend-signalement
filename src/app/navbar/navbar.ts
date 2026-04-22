import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UserServer } from '../servers/user-server';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  

  constructor(public Userserver:UserServer,private router:Router) {}

  ngOnInit(): void {
    
  }

  Logout(){
    this.Userserver.Logout().subscribe({
      next: (data)=>{
        console.log(data)
      },
      error: (err)=>{
        console.log(err)
      }
    })
    this.Userserver.isAuthentifier=false;
    this.Userserver.role='';
    this.Userserver.etatCompte='';
    this.Userserver.userName='';
    this.Userserver.UserIdAuthentifier=-1;
    localStorage.removeItem("etatCompte");
    localStorage.removeItem("isAuthentifier");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    this.router.navigateByUrl("/SignalementPublice");
  }
}
