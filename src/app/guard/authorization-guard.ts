import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserServer } from '../servers/user-server';
import { Router } from '@angular/router';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const userServer=inject(UserServer);
  const router=inject(Router);
  if(userServer.role=="ADMIN"){
    return true;
  }else{
    router.navigateByUrl("/signalementUser");
    return false;
  }
};
