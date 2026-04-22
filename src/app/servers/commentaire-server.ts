import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commentaire } from '../modele/Commentaire';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentaireServer {

  constructor(private Http:HttpClient){}

  public listCommentaireSignalement(id:number):Observable<Array<Commentaire>>{
    return this.Http.get<Array<Commentaire>>(`${environment.apiUrl}/listCommentaireSignalement/`+id, {withCredentials:true})
  }
  public listCommentaireUser(id:number):Observable<Array<Commentaire>>{
    return this.Http.get<Array<Commentaire>>(`${environment.apiUrl}/listCommentaireUser/`+id, {withCredentials:true})
  }

  public listCommentaire():Observable<Array<Commentaire>>{
    return this.Http.get<Array<Commentaire>>(`${environment.apiUrl}/Commentaires`, {withCredentials:true})
  }

  public ajouterCommentaire(id:number,commentaire:Commentaire):Observable<void>{
    return this.Http.post<void>(`${environment.apiUrl}/ajouterCommentaire/`+id, commentaire, {withCredentials:true})
  }

  public ajouterReponse(commentaire:Commentaire):Observable<void>{
    return this.Http.post<void>(`${environment.apiUrl}/repondreCommentaire`, commentaire, {withCredentials:true})
  }

  public deleteCommentaire(id:number):Observable<void>{
    return this.Http.delete<void>(`${environment.apiUrl}/DeleteCommentaire/`+id, {withCredentials:true})
  }
  public ajouterLik(id:number):Observable<void>{
    return this.Http.post<void>(`${environment.apiUrl}/like/`+id, null, {withCredentials:true})
  }

}