import { Routes } from '@angular/router';
import { Dashboard } from './component/dashboard/dashboard';
import { Inventory } from './component/inventory/inventory';
import { Topology } from './component/topology/topology';
import { Logs } from './component/logs/logs'; 

export const routes: Routes = [
    {path:'', redirectTo:'dashboard', pathMatch:'full'},

    {path: 'dashboard', component: Dashboard},
    {path: 'inventory', component: Inventory},
    {path: 'topology', component:Topology},
    {path: 'logs', component:Logs}
];
