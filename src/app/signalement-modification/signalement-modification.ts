import { Component } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from "@angular/forms";
import { OnInit } from '@angular/core';
import { SignalementServer } from '../servers/signalement-server';
import { ActivatedRoute,RouterLink } from '@angular/router';
import { Signalement } from '../modele/Signalement';
import { ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-signalement-modification',
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './signalement-modification.html',
  styleUrl: './signalement-modification.css',
})
export class SignalementModification implements OnInit {

  file!:File;
  ModifierSG!:FormGroup;
  s!:Signalement;
  preview!:string;
  constructor(private signalementServer:SignalementServer,private routerA:ActivatedRoute,private fb:FormBuilder,private cd:ChangeDetectorRef) {}

  ngOnInit(): void {
    const id=this.routerA.snapshot.params['id'];
  
    this.ModifierSG=new FormGroup({
      titre:this.fb.control("",[Validators.required,Validators.minLength(1),Validators.maxLength(100)]),
      description:this.fb.control("",[Validators.required,Validators.minLength(1),Validators.maxLength(100)]),
      localisation:this.fb.control("",[Validators.required,Validators.minLength(1),Validators.maxLength(100)]),
    })
    this.signalementServer.getSignalement(id).subscribe({
      next: (data)=>{
        this.s=data;
        this.ModifierSG.setValue({
          titre:this.s.titre,
          description:this.s.description,
          localisation:this.s.Localisation,
        })
        this.cd.detectChanges();
      },
      error: (err)=>{
        console.log(err)
      }
    })

  }

  SelectedFile(event:any){
    this.file=event.target.files[0];
    this.preview=URL.createObjectURL(this.file);
  }

  Modifier(){
    const id=this.routerA.snapshot.params['id'];
    const formData=new FormData();
    let signalement:Partial<Signalement>={titre:this.ModifierSG?.value.titre,description:this.ModifierSG?.value.description,Localisation:this.ModifierSG?.value.localisation,statue:this.s.statue}
    formData.append("imageS",this.file);
    formData.append("signalement",JSON.stringify(signalement));
    this.signalementServer.ModifierS(id,formData).subscribe({
      next: (data)=>{
        console.log(data)
        alert("Signalement modifié avec succès")
        this.signalementServer.getSignalement(id).subscribe({
      next: (data)=>{
        this.s=data;
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
}
