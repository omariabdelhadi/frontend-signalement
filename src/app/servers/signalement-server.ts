import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Signalement } from '../modele/Signalement';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalementServer {

  constructor(private Http:HttpClient){}

  public getSignalementUser(id:number):Observable<Array<Signalement>>{
    return this.Http.get<Array<Signalement>>(`${environment.apiUrl}/signalementsUser/`+id, {withCredentials:true})
  }
  public deleteSignalement(id:number):Observable<void>{
    return this.Http.delete<void>(`${environment.apiUrl}/deleteS/`+id, {withCredentials:true})
  }
  public getSignalement(id:number):Observable<Signalement>{
    return this.Http.get<Signalement>(`${environment.apiUrl}/signalementsUserDetils/`+id, {withCredentials:true})
  }
  public getSignalements():Observable<Array<Signalement>>{
    return this.Http.get<Array<Signalement>>(`${environment.apiUrl}/signalements`, {withCredentials:true})
  }
  public ModifierS(id:number,form:FormData):Observable<void>{
    return this.Http.post<void>(`${environment.apiUrl}/modifierS/`+id, form, {withCredentials:true})
  }
  public ajouterSignalement(form:FormData):Observable<void>{
    return this.Http.post<void>(`${environment.apiUrl}/ajouterSignalement`, form, {withCredentials:true})
  }
  public signalementsUS(statue:string):Observable<Array<Signalement>>{
    return this.Http.get<Array<Signalement>>(`${environment.apiUrl}/signalementsUS/`+statue, {withCredentials:true})
  }
  public signalementsS(statue:string):Observable<Array<Signalement>>{
    return this.Http.get<Array<Signalement>>(`${environment.apiUrl}/signalementsS/`+statue, {withCredentials:true})
  }
  public modifierStatue(id:number,statue:string):Observable<void>{
    return this.Http.put<void>(`${environment.apiUrl}/modifierStatue/`+id+"/"+statue, null, {withCredentials:true})
  }
  public SignalementCommentaire(id:number):Observable<Signalement>{
    return this.Http.get<Signalement>(`${environment.apiUrl}/SignalementCommentaire/`+id, {withCredentials:true})
  }
}