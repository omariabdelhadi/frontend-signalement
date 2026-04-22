import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserServer } from '../servers/user-server';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const userServer=inject(UserServer);
  const router=inject(Router);
  if(userServer.isAuthentifier){
    return true;
  }else{
    router.navigateByUrl("/Authentification");
    return false;
  }
};
