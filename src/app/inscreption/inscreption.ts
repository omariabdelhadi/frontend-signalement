import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../modele/User';
import { UserServer } from '../servers/user-server';
import { FormBuilder } from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-inscreption',
  imports: [ ReactiveFormsModule,RouterLink],
  templateUrl: './inscreption.html',
  styleUrl: './inscreption.css',
})
export class Inscreption implements OnInit {
  InscreptionU!:FormGroup

  constructor(private UserServer:UserServer,private fb:FormBuilder) {}

  ngOnInit(): void {
    this.InscreptionU=new FormGroup({
      username:this.fb.control('',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
      password:this.fb.control('',[Validators.required,Validators.minLength(6),Validators.maxLength(30)]),
      age:this.fb.control('',[Validators.required,Validators.min(18),Validators.max(100),Validators.pattern('^[0-9]*$')]),
      Emploi:this.fb.control('',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
    })
  }

  Inscreption(){
    let user:Partial<User>={username:this.InscreptionU?.value.username,password:this.InscreptionU?.value.password,role:'USER',etatCompe:'MARCHE',age:this.InscreptionU?.value.age,jobe:this.InscreptionU?.value.Emploi}
    this.UserServer.ajouterUser(user as User).subscribe({
      next: (data)=>{
        console.log(data)
        alert("inscription reussi")
        this.InscreptionU.reset();
      },
      error: (err)=>{
        alert("cette username existe deja")
        console.log(err)
      }
    })
  }

}
