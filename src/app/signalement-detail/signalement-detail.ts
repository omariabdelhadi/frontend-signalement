import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Signalement } from '../modele/Signalement';
import { ActivatedRoute , RouterLink } from '@angular/router';
import { SignalementServer } from '../servers/signalement-server';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { UserServer } from '../servers/user-server';
import { Location } from '@angular/common';
import { NgClass } from '@angular/common';
import { Commentaire } from '../modele/Commentaire';
import { CommentaireServer } from '../servers/commentaire-server';
import { FormGroup,ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { User } from '../modele/User';

@Component({
  selector: 'app-signalement-detail',
  imports: [  NgFor, NgIf ,RouterLink,NgClass ,ReactiveFormsModule,DatePipe ,CommonModule],
  templateUrl: './signalement-detail.html',
  styleUrl: './signalement-detail.css',
})
export class SignalementDetail implements OnInit{

  s!:Signalement;
  commentaires:Array<Commentaire>=[];
  showForm:boolean=false;
  CommentaireForm!:FormGroup;
  ReponseForm!:FormGroup;  
  apiUrl=environment.apiUrl;
  user!:User;
  userId!:number;

  constructor(private routerA:ActivatedRoute,private signalementServer:SignalementServer,private cd:ChangeDetectorRef,private router:Router,public userServer:UserServer,private location:Location,private commentaireServer:CommentaireServer,private fb:FormBuilder){}

  ngOnInit(): void {
    const id=this.routerA.snapshot.params['id'];
    this.signalementServer.getSignalement(id).subscribe({
      next: (data)=>{
        this.s=data;
        if(this.userServer.isAuthentifier){
          this.userServer.getUser(this.s.userId).subscribe({
      next: (data)=>{
        this.user=data;
        this.cd.detectChanges();
      },
      error: (err)=>{
        console.log(err)
      }
    })
        }
        this.cd.detectChanges();
      },
      error: (err)=>{
        console.log(err)
      }
    })
    this.commentaireServer.listCommentaireSignalement(id).subscribe({
      next: (data)=>{
        this.commentaires=data;
        this.commentaires=this.commentaires.filter(commentaire=>commentaire.parentId==null)
        this.cd.detectChanges();
      },
      error: (err)=>{
        console.log(err)
      }
    })
    this.CommentaireForm=new FormGroup({
      contenue:this.fb.control("",[Validators.required,Validators.minLength(1),Validators.maxLength(100)])
    })
    this.ReponseForm=new FormGroup({
      contenueReponse:this.fb.control("",[Validators.required,Validators.minLength(1),Validators.maxLength(100)])
    })
  }

  deleteS(id:number){
    if(confirm("vous voulez supprimer ce signalement")){
      this.signalementServer.deleteSignalement(id).subscribe({
      next: (data)=>{
        this.router.navigateByUrl("/signalementUser");
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
  retour(){
    this.location.back();
  }

  ajouterCommentaire(){
    const id=this.routerA.snapshot.params['id'];
    let commentaire:Partial<Commentaire>={contenue:this.CommentaireForm?.value.contenue,date:new Date()}
    this.commentaireServer.ajouterCommentaire(id,commentaire as Commentaire).subscribe({
      next: (data)=>{
        this.showForm=false;
        this.commentaireServer.listCommentaireSignalement(id).subscribe({
      next: (data)=>{
        this.commentaires=data;
        this.commentaires=this.commentaires.filter(commentaire=>commentaire.parentId==null)
        this.cd.detectChanges();
      },
      error: (err)=>{
        console.log(err)
      }
    })
        this.cd.detectChanges();
      },
      error: (err)=>{
        console.log(err)
      }
    })
    this.CommentaireForm.reset();
  }

  deleteCommentaire(id:number){
    this.commentaireServer.deleteCommentaire(id).subscribe({
      next: (data)=>{
        this.commentaireServer.listCommentaireSignalement(this.routerA.snapshot.params['id']).subscribe({
      next: (data)=>{
        this.commentaires=data;
        this.commentaires=this.commentaires.filter(commentaire=>commentaire.parentId==null)
        this.cd.detectChanges();
      },
      error: (err)=>{
        console.log(err)
      }
    })
        this.cd.detectChanges();
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  profile(id:number){
    this.router.navigateByUrl("/profile/"+id)
  }
  ajouterReponse(id:number){
    let commentaire:Partial<Commentaire>={contenue:this.ReponseForm?.value.contenueReponse, date:new Date(), parentId:id} 
    this.commentaireServer.ajouterReponse(commentaire as Commentaire).subscribe({
      next: (data)=>{
        const parent=this.commentaires.find(c => c.id === id);
        if(parent){
          parent.showForm=false;
        }else{
          this.commentaires.forEach(c => {
                    const reponse = c.reponses?.find(r => r.id === id);
                    if (reponse) reponse.showForm = false;
          });
        }
        this.ReponseForm.reset(); // ✅
        this.commentaireServer.listCommentaireSignalement(this.routerA.snapshot.params['id']).subscribe({
          next: (data)=>{
            this.commentaires=data;
            this.commentaires=this.commentaires.filter(commentaire=>commentaire.parentId==null)
            this.cd.detectChanges();
          },
          error: (err)=>{ console.log(err) }
        })
      },
      error: (err)=>{ console.log(err) }
    })
}
  like(id:number){
    this.commentaireServer.ajouterLik(id).subscribe({
      next: (data)=>{
        this.commentaireServer.listCommentaireSignalement(this.routerA.snapshot.params['id']).subscribe({
          next: (data)=>{
            this.commentaires=data;
            this.commentaires=this.commentaires.filter(commentaire=>commentaire.parentId==null)
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
  formatLikes(likes: number): string {
  if (likes >= 1000000) {
    return (likes / 1000000).toFixed(likes % 1000000 === 0 ? 0 : 1) + 'm';
  }
  if (likes >= 1000) {
    return (likes / 1000).toFixed(likes % 1000 === 0 ? 0 : 1) + 'k';
  }
  return likes.toString();
}
}
