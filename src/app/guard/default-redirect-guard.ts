import { CanActivateFn } from '@angular/router';
import { UserServer } from '../servers/user-server';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const defaultRedirectGuard: CanActivateFn = (route, state) => {
  

  const userServer=inject(UserServer);
  const router=inject(Router);

  if(userServer.isAuthentifier && userServer.role=="USER"){
    return router.navigateByUrl("/signalementUser");
  }

  return router.navigateByUrl("/SignalementPublice");
  
};
