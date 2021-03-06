import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientContactFormComponent } from './components/client-contact-form.component';
import { ClientDeleteComponent } from './components/client-delete.component';
import { ClientDetailFormComponent } from './components/client-detail-form.component';
import { ClientListComponent } from './components/client-list.component';
import { ClientComponent } from './components/client.component';
import { JobDeleteComponent } from './components/job-delete.component';
import { JobDetailFormComponent } from './components/job-detail-form.component';
import { JobRecurringCostFormComponent } from './components/job-recurring-cost-form.component';
import { JobRelationshipFormComponent } from './components/job-relationship-form.component';
import { JobComponent } from './components/job.component';
import { NotFoundComponent } from './components/not-found.component';
import { TasksComponent } from './components/tasks.component';
import { TimesheetComponent } from './components/time-sheet.component';

const routes: Routes = [
    { path: '', component: TasksComponent },
    { path: 'clients', component: ClientListComponent},
    { path: 'clients/new', component: ClientDetailFormComponent},
    { path: 'clients/:id', component: ClientComponent},
    { path: 'clients/:id/detail', component: ClientDetailFormComponent},
    { path: 'clients/:id/delete', component: ClientDeleteComponent},
    { path: 'clients/:client_id/contacts/new', component: ClientContactFormComponent},
    { path: 'clients/:client_id/contacts/:id', component: ClientContactFormComponent},
    { path: 'clients/:client_id/jobs/new', component: JobDetailFormComponent},
    { path: 'clients/:client_id/jobs/:id/detail', component: JobDetailFormComponent},
    { path: 'clients/:client_id/jobs/:id/delete', component: JobDeleteComponent},
    { path: 'clients/:client_id/jobs/:id', component: JobComponent},
    { path: 'clients/:client_id/jobs/:job_id/recurring-costs/new', component: JobRecurringCostFormComponent},
    { path: 'clients/:client_id/jobs/:job_id/recurring-costs/:id', component: JobRecurringCostFormComponent},
    { path: 'clients/:client_id/jobs/:job_id/relationships/new', component: JobRelationshipFormComponent},
    { path: 'clients/:client_id/jobs/:job_id/relationships/:id', component: JobRelationshipFormComponent},
    { path: 'timesheet', component: TimesheetComponent},
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/404' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }