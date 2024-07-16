import { NgModule, InjectionToken } from '@angular/core';

export const AUTHSERVER = new InjectionToken<string>('AuthServerPath');

@NgModule({
  providers: [
    { provide: AUTHSERVER, useValue: 'http://localhost:4231' } // backend server ip address - LOG Application listening on port 4231
  ]
})
export class CoreModule { }
