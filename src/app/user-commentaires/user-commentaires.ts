import { Component, OnInit } from '@angular/core';
import { CommentaireServer } from '../servers/commentaire-server';
import { Commentaire } from '../modele/Commentaire';
import { UserServer } from '../servers/user-server';
import { ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../modele/User';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-user-commentaires',
  imports: [NgFor, NgIf, RouterLink, NgClass],
  templateUrl: './user-commentaires.html',
  styleUrl: './user-commentaires.css',
})
export class UserCommentaires implements OnInit{

  commentaires:Array<Commentaire>=[];
  user!:User;
  constructor(private commentaireServer:CommentaireServer,public userServer:UserServer,private cd:ChangeDetectorRef,private location:Location,private router:Router,private routerA:ActivatedRoute){}

  ngOnInit(): void {
    const id=this.routerA.snapshot.params['id'];
    this.commentaireServer.listCommentaireUser(id).subscribe({
      next: (data)=>{
        this.commentaires=data;
        this.cd.detectChanges();
      },
      error: (err)=>{
        console.log(err)
      }
    })
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

  deleteCommentaire(id:number){
    this.commentaireServer.deleteCommentaire(id).subscribe({
      next: (data)=>{
        this.commentaireServer.listCommentaireUser(this.routerA.snapshot.params['id']).subscribe({
      next: (data)=>{
        this.commentaires=data;
        this.cd.detectChanges();
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
  }

  retour(){
    this.location.back();
  }

  SignalementC(id:number){
    this.router.navigateByUrl("/details/"+id)
  }

}
