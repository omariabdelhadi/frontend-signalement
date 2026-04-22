import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { OnInit } from '@angular/core';
import { SignalementServer } from '../servers/signalement-server';
import { Signalement } from '../modele/Signalement';
import { ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserServer } from '../servers/user-server';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-signalement-user',
  imports: [NgFor, NgIf, RouterLink ,NgClass],
  templateUrl: './signalement-user.html',
  styleUrl: './signalement-user.css',
})
export class SignalementUser implements OnInit {

  signalements:Array<Signalement>=[];

  constructor(private signalementServer:SignalementServer,private cd:ChangeDetectorRef,private router:Router,public userServer:UserServer){}

  ngOnInit(): void {
    const id=this.userServer.UserIdAuthentifier;
    this.signalementServer.getSignalementUser(id).subscribe({
      next: (data)=>{
        this.signalements=data;
        this.cd.detectChanges();
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  deleteS(id:number){
    if(confirm("vous voulez supprimer ce signalement")){
      this.signalementServer.deleteSignalement(id).subscribe({
      next: (data)=>{
        this.signalements=this.signalements.filter(signalement=>signalement.id!=id);
        this.cd.detectChanges();
      },
      error: (err)=>{
        console.log(err)
      }
    })
    }
  }

  details(id:number){
    this.router.navigateByUrl("/details/"+id);
  }
  Modifier(id:number){
    this.router.navigateByUrl("/modifier/"+id);
  }
  AjouterSignalement(){
    this.router.navigateByUrl("/creation");
  }

  statueChoix(choix:string){
    this.signalementServer.signalementsUS(choix).subscribe({
      next: (data)=>{
        this.signalements=data;
        this.cd.detectChanges();
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }
  toutsSignalement(){
    this.ngOnInit()
  }
  mesCommentaires(){
    const id=this.userServer.UserIdAuthentifier;
    this.router.navigateByUrl("/UserCommentaire/"+id)
  }
}
