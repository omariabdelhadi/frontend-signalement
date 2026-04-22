import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UserServer } from '../servers/user-server';
import { User } from '../modele/User';
import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [ NgFor, NgIf , RouterLink, NgClass],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {

  users:Array<User>=[];
  file!:File;

  constructor(public userServer:UserServer,private cd:ChangeDetectorRef,private router:Router) {}

  ngOnInit(): void {
    this.userServer.getUsers().subscribe({
      next: (data)=>{
        this.users=data;
        this.users=this.users.filter(user=>user.role!="ADMIN")
        this.cd.detectChanges();
      
      },
      error: (err)=>{
        console.log(err)
      }

    })
  }

  deleteUser(id:number){
    if(confirm("vous voulez supprimer cet utilisateur")){
      this.userServer.deleteUser(id).subscribe({
      next: (data)=>{
        this.users=this.users.filter(user=>(user.id!=id));
        this.cd.detectChanges();
      },
      error: (err)=>{
        console.log(err)
      }
    })
    }
  }

  ModifierEtateCompte(id:number,etatCompte:string){
    this.userServer.modifierEtatCompte(id,etatCompte).subscribe({
      next: (data)=>{
        this.ngOnInit();
        this.cd.detectChanges();
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  EtatChoix(etatCompte:string){
    this.userServer.filtrerParEtatCompte(etatCompte).subscribe({
      next: (data)=>{
        this.users=data;
        this.users=this.users.filter(user=>user.role!="ADMIN")
        this.cd.detectChanges();
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  touts(){
    this.ngOnInit();
  }

  SignalementsUser(id:number){
    this.router.navigateByUrl("/SignalementsUserForA/"+id);
  }
  profile(id:number){
    this.router.navigateByUrl("/profile/"+id)
  }
  commentaires(id:number){
    this.router.navigateByUrl("/UserCommentaire/"+id)
  }
    
}
