import { Routes } from '@angular/router';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/landing-page',
        pathMatch: 'full'
    },
     {
        path: 'landing-page',
        component: LandingPageComponent,
    },
    {
        path: 'resume-builder',
        component: ResumeBuilderComponent,
    }
];
