import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { OnInit } from '@angular/core';
import { SignalementServer } from '../servers/signalement-server';
import { Signalement } from '../modele/Signalement';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { UserServer } from '../servers/user-server';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-signalements-user-for-a',
  imports: [ NgFor, NgIf, RouterLink, NgClass],
  templateUrl: './signalements-user-for-a.html',
  styleUrl: './signalements-user-for-a.css',
})
export class SignalementsUserForA implements OnInit{
  signalements:Array<Signalement>=[];
  constructor(private signalementServer:SignalementServer,private cd:ChangeDetectorRef,private router:Router,public userServer:UserServer,private routerA:ActivatedRoute){}

  ngOnInit(): void {
    const id=this.routerA.snapshot.params["id"];
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
  details(id:number){
    this.router.navigateByUrl("/details/"+id);
  }
  statueChoix(choix:string){
    this.signalementServer.signalementsS(choix).subscribe({
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
  ModifierStatue(id:number,statue:string){
    this.signalementServer.modifierStatue(id,statue).subscribe({
      next: (data)=>{
        this.ngOnInit();
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
}
