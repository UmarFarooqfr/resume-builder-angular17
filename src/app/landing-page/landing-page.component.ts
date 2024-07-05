import { Component } from '@angular/core';
import { MaterialModule } from '../../../demo-material-module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  constructor(private router :Router){

  }
  moveToResumePage(){
    this.router.navigate(['./resume-builder'])
  }
}
