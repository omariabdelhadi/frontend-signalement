import { Component, OnInit } from '@angular/core';
import { CommentaireServer } from '../servers/commentaire-server';
import { Commentaire } from '../modele/Commentaire';
import { UserServer } from '../servers/user-server';
import { ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-commentaires',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './commentaires.html',
  styleUrl: './commentaires.css',
})
export class Commentaires implements OnInit{

  commentaires:Array<Commentaire>=[];
  constructor(private commentaireServer:CommentaireServer,public userServer:UserServer,private cd:ChangeDetectorRef,private location:Location,private router:Router,private routerA:ActivatedRoute){}

  ngOnInit(): void {

    this.commentaireServer.listCommentaire().subscribe({
      next: (data)=>{
        this.commentaires=data;
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
        this.commentaires=this.commentaires.filter(commentaire=>commentaire.id!=id);
        this.cd.detectChanges();
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
