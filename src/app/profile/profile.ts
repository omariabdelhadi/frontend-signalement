import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UserServer } from '../servers/user-server';
import { NgFor, NgIf } from '@angular/common';
import { User } from '../modele/User';
import { ActivatedRoute, Router, RouterLink, provideRouter } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [ NgFor, NgIf, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit{

  user!:User;

  constructor(public userServer:UserServer,private cd:ChangeDetectorRef,private router:Router,private routerA:ActivatedRoute,private location:Location){}


  ngOnInit(): void {
    const id=this.routerA.snapshot.params['id'];
    this.userServer.getUser(id).subscribe({
      next: (data)=>{
        this.user=data;
        this.cd.detectChanges();
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  deleteProfile(id:number){
    if(confirm("vous voulez supprimer votre profile?!")){
      this.userServer.deleteUser(id).subscribe({
      next: (data)=>{
      alert("Profile supprimé avec succès")
      this.userServer.Logout().subscribe({
      next: (data)=>{
        console.log(data)
      },
      error: (err)=>{
        console.log(err)
      }
    })
      },
      error: (err)=>{
        console.log(err)
      }       
    })

    this.userServer.isAuthentifier=false;
    this.userServer.role='';
    this.userServer.etatCompte='';
    this.userServer.userName='';
    this.userServer.UserIdAuthentifier=-1;
    localStorage.removeItem("isAuthentifier");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("etatCompte");
    localStorage.removeItem("id");
    this.router.navigateByUrl("/Authentification");
    
    }
  }

  retour(){
    this.location.back();
  }

  ModifierEtateCompte(id:number,etatCompte:string){
    this.userServer.modifierEtatCompte(id,etatCompte).subscribe({
      next: (data)=>{
        this.ngOnInit();
        this.cd.detectChanges();
        if(etatCompte=="Bloque"){
          alert("tu as blocker se compte")
        }else if(etatCompte=="MARCHE"){
          alert("tu deblocker se compte")
        }
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

}
