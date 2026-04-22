import { Component, signal } from '@angular/core';
import { Form, FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SignalementServer } from '../servers/signalement-server';
import { Signalement } from '../modele/Signalement';
import { RouterLink } from "@angular/router";
import { UserServer } from '../servers/user-server';
import { ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-creation-signalement',
  imports: [ReactiveFormsModule, RouterLink, NgFor, NgIf],
  templateUrl: './creation-signalement.html',
  styleUrl: './creation-signalement.css',
})
export class CreationSignalement implements OnInit {
  CreationGroup!:FormGroup;
  file!:File;
  previewUrl!:string;
  @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(private fb:FormBuilder,private signalementServer:SignalementServer,private Userserver:UserServer,private cd:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.CreationGroup=new FormGroup({
      titre:this.fb.control("",[Validators.required,Validators.minLength(3),Validators.maxLength(11)]),
      description:this.fb.control("",[Validators.required,Validators.minLength(3),Validators.maxLength(100)]),
      localisation:this.fb.control("",[Validators.required,Validators.minLength(3),Validators.maxLength(10)])
    })
  }
  SelectedFile(event:any){
    this.file=event.target.files[0];
    this.previewUrl=URL.createObjectURL(this.file);
  }
  Ajouter(){
    const formdata=new FormData();
    formdata.append("imageS",this.file);
    let signalement:Partial<Signalement>={titre:this.CreationGroup?.value.titre,description:this.CreationGroup?.value.description,Localisation:this.CreationGroup?.value.localisation,userId:this.Userserver.UserIdAuthentifier,statue:"NOUVEAU",date:new Date()}
    formdata.append("signalementDTO",JSON.stringify(signalement));
    this.signalementServer.ajouterSignalement(formdata).subscribe({
      next: (data)=>{
        this.CreationGroup.reset();
        this.fileInput.nativeElement.value='';
        this.previewUrl="";
    this.file=null!;
    this.cd.detectChanges();
        alert("Signalement ajouté avec succès")
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }
}
