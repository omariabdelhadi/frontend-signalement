import { Routes } from '@angular/router';
import { Users } from './users/users';
import { Authentification } from './authentification/authentification';
import { authGuard } from './guard/auth-guard';
import { SignalementUser } from './signalement-user/signalement-user';
import { SignalementDetail } from './signalement-detail/signalement-detail';
import { SignalementModification } from './signalement-modification/signalement-modification';
import { CreationSignalement } from './creation-signalement/creation-signalement';
import { Inscreption } from './inscreption/inscreption';
import { SignalementPublice } from './signalement-publice/signalement-publice';
import { Profile } from './profile/profile';
import { ModifierProfile } from './modifier-profile/modifier-profile';
import { authorizationGuard } from './guard/authorization-guard';
import { SignalementsUserForA } from './signalements-user-for-a/signalements-user-for-a';
import { defaultRedirectGuard } from './guard/default-redirect-guard';
import { UserCommentaires } from './user-commentaires/user-commentaires';
import { Commentaires } from './commentaires/commentaires';


export const routes: Routes = [

    
    {path:"Authentification",component:Authentification},
    {path:"users",component:Users,canActivate:[authGuard,authorizationGuard]},
    {path:"signalementUser",component:SignalementUser,canActivate:[authGuard]},
    {path:"profile/:id",component:Profile,canActivate:[authGuard]},
    {path:"ModifierProfile",component:ModifierProfile,canActivate:[authGuard]},
    {path:"details/:id",component:SignalementDetail},
    {path:"Commentaires",component:Commentaires,canActivate:[authGuard,authorizationGuard]},
    {path:"SignalementPublice",component:SignalementPublice},
    {path:"inscription",component:Inscreption},
    {path:"SignalementsUserForA/:id",component:SignalementsUserForA,canActivate:[authGuard,authorizationGuard]},
    {path:"modifier/:id",component:SignalementModification,canActivate:[authGuard]},
    {path:"creation",component:CreationSignalement,canActivate:[authGuard]},
    {path:"UserCommentaire/:id",component:UserCommentaires,canActivate:[authGuard]},
    {path:"",canActivate:[defaultRedirectGuard], component:SignalementPublice,pathMatch:"full"},
    {path:"**",canActivate:[defaultRedirectGuard], component: SignalementPublice}
    
];
