import { Routes } from '@angular/router';
import { Dashboard } from './component/dashboard/dashboard';
import { Inventory } from './component/inventory/inventory';
import { Topology } from './component/topology/topology';
import { Logs } from './component/logs/logs'; 
import { Signup } from './auth/signup/signup';
import { Login } from './auth/login/login';

export const routes: Routes = [
    {path:'', redirectTo:'/login', pathMatch:'full'},

    {path: 'dashboard', component: Dashboard},
    {path: 'inventory', component: Inventory},
    {path: 'topology', component:Topology},
    {path: 'logs', component:Logs},
    {path: 'login', component:Login},
    {path: 'signup', component:Signup}
];
