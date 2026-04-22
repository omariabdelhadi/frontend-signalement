import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../modele/User';
import { UserServer } from '../servers/user-server';
import { routes } from '../app.routes';
import { Route, Router, RouterLink} from '@angular/router';


@Component({
  selector: 'app-authentification',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './authentification.html',
  styleUrl: './authentification.css',
})
export class Authentification implements OnInit {

  Auth!:FormGroup;

  constructor(private fb:FormBuilder,private userServer:UserServer,private router:Router) {}

  ngOnInit(): void {
    if(this.userServer.isAuthentifier && this.userServer.role=="USER"){
      this.router.navigateByUrl("/signalementUser");
    }else if(this.userServer.isAuthentifier && this.userServer.role=="ADMIN"){
      this.router.navigateByUrl("/SignalementPublice");
    }
    this.Auth=new FormGroup({
      username : this.fb.control('',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
      password : this.fb.control('',[Validators.required,Validators.minLength(3),Validators.maxLength(30)])
    })
  }

  auth(){
    let username=this.Auth?.value.username;
    let password=this.Auth?.value.password;
    let user:Partial<User>={username:username,password:password,role:'USER'}
    this.userServer.auth(user as User).subscribe({
      next: (data)=>{
        console.log(data)
        this.userServer.isAuthentifier=true;
        this.userServer.role=data["role"];
        this.userServer.UserIdAuthentifier=data["id"];
        this.userServer.etatCompte=data["etatCompte"];
        this.userServer.userName=data["user"];
        localStorage.setItem("etatCompte",data["etatCompte"]);
        localStorage.setItem("isAuthentifier","true");
        localStorage.setItem("role",data["role"]);
        localStorage.setItem("id",data["id"].toString());
        localStorage.setItem("user",data["user"]);
        this.Auth.reset();
        if(this.userServer.role=="USER"){
          this.router.navigateByUrl("/signalementUser");
        }else if(this.userServer.role=="ADMIN"){
          this.router.navigateByUrl("/SignalementPublice");
        }
      },
      error: (err)=>{
        alert("username ou mot de passe incorrect")
        console.log(err)
      }
    })

  }

}
