import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Menu {
  constructor() { }
  public menu: any = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      url: '/dashboard'
    },
    {
      title: 'Máquinaria',
      icon: 'settings',
      url: '/maquinaria'
    },
    {
      title: 'Usuarios',
      icon: 'person',
      url: '/usuarios'
    },
    {
      title: 'Importaciones',
      icon: 'play_for_work',
      url: '/importaciones'
    }
  ];
}
