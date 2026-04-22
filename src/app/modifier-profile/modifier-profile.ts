import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../modele/User';
import { UserServer } from '../servers/user-server';
import { ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-modifier-profile',
  imports: [ ReactiveFormsModule, NgIf, NgFor , RouterLink],
  templateUrl: './modifier-profile.html',
  styleUrl: './modifier-profile.css',
})
export class ModifierProfile implements OnInit{

  ModifierProfile!:FormGroup
  file!:File;
  user!:User;
  preview!:string;

  constructor(private userServer:UserServer,private fb:FormBuilder,private cd:ChangeDetectorRef){}

  ngOnInit(): void {
    this.ModifierProfile=new FormGroup({
      username:this.fb.control("",[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
      age:this.fb.control("",[Validators.required,Validators.min(18),Validators.max(100),Validators.pattern('^[0-9]*$')]),
      jobe:this.fb.control("",[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
      password:this.fb.control('',[Validators.minLength(6),Validators.maxLength(30)]),
    })
    this.userServer.getUser(this.userServer.UserIdAuthentifier).subscribe({
      next: (data)=>{
        this.user=data;
        this.ModifierProfile.setValue({
          username:this.user.username,
          age:this.user.age,
          jobe:this.user.jobe,
          password:null
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

  ModifierProfileU(){
    const formdata=new FormData();
    if(this.file){
      formdata.append("image",this.file);  
    }
    let role=this.user.role;
    let etatCompte=this.user.etatCompe;
    let id=this.user.id;
    let userM:Partial<User>={id:id,username:this.ModifierProfile?.value.username,age:this.ModifierProfile?.value.age,jobe:this.ModifierProfile?.value.jobe,role:role,password:this.ModifierProfile?.value.password,etatCompe:etatCompte,imageProfile:this.user.imageProfile}
    formdata.append("user",JSON.stringify(userM))
    this.userServer.ModifierUser(formdata).subscribe({
      next: (data)=>{
        alert("Profile modifié avec succès")
        this.userServer.getUser(this.userServer.UserIdAuthentifier).subscribe({
          next: (data)=>{
            this.user=data;
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

  delete(){
    if(confirm("vous voulez supprimer votre image de profile")){
      this.userServer.deleteImage().subscribe({
      next: (data)=>{
        this.userServer.getUser(this.userServer.UserIdAuthentifier).subscribe({
          next: (data)=>{
            this.user=data;
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

}
