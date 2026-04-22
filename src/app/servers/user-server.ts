import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../modele/User';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserServer {

  isAuthentifier!:boolean;
  role!:string;
  UserIdAuthentifier!:number;
  etatCompte!:string;
  userName!:string;

  constructor(private Http:HttpClient){
    this.isAuthentifier=localStorage.getItem("isAuthentifier")=="true"?true:false;
    this.role=localStorage.getItem("role")||'';
    this.UserIdAuthentifier=Number(localStorage.getItem("id"))||-1;
    this.etatCompte=localStorage.getItem("etatCompte")||'';
    this.userName=localStorage.getItem("user")||'';
  }

  public auth(user:User):Observable<any>{
    return this.Http.post<any>(`${environment.apiUrl}/login`, user, {withCredentials:true})
  }
  public getUsers():Observable<Array<User>>{
    return this.Http.get<Array<User>>(`${environment.apiUrl}/users`, {withCredentials:true})
  }
  public getUser(id:number):Observable<User>{
    return this.Http.get<User>(`${environment.apiUrl}/user/`+id, {withCredentials:true})
  }
  public deleteUser(id:number):Observable<void>{
    return this.Http.delete<void>(`${environment.apiUrl}/Delete/`+id, {withCredentials:true})
  }
  public Logout():Observable<void>{
    return this.Http.get<void>(`${environment.apiUrl}/logout`, {withCredentials:true})
  }
  public ModifierUser(form:FormData):Observable<void>{
    return this.Http.post<void>(`${environment.apiUrl}/modifierUser`, form, {withCredentials:true})
  }
  public deleteImage():Observable<void>{
    return this.Http.delete<void>(`${environment.apiUrl}/DeleteImageProf`, {withCredentials:true})
  }
  public ajouterUser(user:User):Observable<void>{
    return this.Http.post<void>(`${environment.apiUrl}/inscription`, user, {withCredentials:true})
  }
  public modifierEtatCompte(id:number,etatCompte:string):Observable<void>{
    return this.Http.put<void>(`${environment.apiUrl}/modifierEtatCompte/`+id+"/"+etatCompte, null, {withCredentials:true})
  }
  public filtrerParEtatCompte(etatCompte:string):Observable<Array<User>>{
    return this.Http.get<Array<User>>(`${environment.apiUrl}/filterEtat/`+etatCompte, {withCredentials:true})
  }
}