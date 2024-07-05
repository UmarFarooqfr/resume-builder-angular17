import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MaterialModule } from '../../../demo-material-module';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-resume-builder',
  standalone: true,
  imports: [MaterialModule, FormsModule, CommonModule],
  templateUrl: './resume-builder.component.html',
  styleUrl: './resume-builder.component.scss',
})
export class ResumeBuilderComponent implements OnInit, AfterViewInit {
  @ViewChild('content', { static: false }) content!: ElementRef;
  rating1 = [true, true, true, true, true];
  rating2 = [true, true, true, true, true];
  rating3 = [true, true, true, true, true];
  rating4 = [true, true, true, true, true];
  rating5 = [true, true, true, true, true];
  rating6 = [true, true, true, true, true];
  themeArray :any =[
    {
     color:'#f87171'
    },
    {
     color:'#ef4444'
    },
    {
     color:'#fb923c'
    },
    {
     color:'#f97316'
    },
    {
     color:'#fbbf24'
    },
    {
     color:'#f59e0b'
    },
    {
     color:'#22c55e'
    },
    {
     color:'#15803d'
    },
    {
     color:'#38bdf8'
    },
    {
     color:'#0ea5e9'
    },
    {
     color:'#818cf8'
    },
    {
     color:'#6366f1'
    },
  ]
  fontArray:any=[
    {
      name:'Roboto'
    },
    {
      name:'Lato'
    },
    {
      name:'Montserrat'
    },
    {
      name:'Open Sans'
    },
    {
      name:'Raleway'
    },
    {
      name:'Caladea'
    },
    {
      name:'Lora'
    },
    {
      name:'Roboto Slab'
    },
    {
      name:'PlayFair Display'
    },
    {
      name:'Merriweather'
    },
  ]
  fontSize:number = 11  
  themeColorValue:string = ''
  fontFamilyValue:string = ''
  resumeValue: any = {
    resume: {
      profile: {
        name: '',
        summary: '',
        email: '',
        phone: '',
        location: '',
        url: '',
      },
      workExperiences: [
        {
          company: '',
          jobTitle: '',
          date: '',
          descriptions: [],
        },
      ],
      educations: [
        {
          school: '',
          degree: '',
          gpa: '',
          date: '',
          descriptions: [],
        },
      ],
      projects: [
        {
          project: '',
          date: '',
          descriptions: [],
        },
      ],
      skills: {
        descriptions: [],
        featuredSkills: [
          {
            skill: '',
            rating: this.rating1,
          },
          {
            skill: '',
            rating: this.rating2,
          },
          {
            skill: '',
            rating: this.rating3,
          },
          {
            skill: '',
            rating: this.rating4,
          },
          {
            skill: '',
            rating: this.rating5,
          },
          {
            skill: '',
            rating: this.rating6,
          },
        ],
      },
    },
  };
  /**
   *
   * @param router
   */
  constructor(private router: Router) {}

  /**
   * OnInit
   */

  ngOnInit(): void {
    this.fontFamilyValue = 'Roboto',
    this.themeColorValue = '#38bdf8'
  }

  /**
   * AfterViewInit
   */
  ngAfterViewInit() {}

  /**
   * autoResize
   * @param event
   * @param id
   * @param index
   */
  autoResize(event: any, id: any, index: number) {
    console.log('id: ', id);
    const inputElement = event.target as HTMLElement;
    if (id === 'descriptionInput' + index) {
      this.resumeValue.resume.workExperiences[index].descriptions =
        inputElement.innerText
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.length > 0);
    } else if (id === 'additionalInput' + index) {
      this.resumeValue.resume.educations[index].descriptions =
        inputElement.innerText
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.length > 0);
    } else if (id === 'projectDescription' + index) {
      this.resumeValue.resume.projects[index].descriptions =
        inputElement.innerText
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.length > 0);
    } else if (id === 'skillsInput' + index) {
      this.resumeValue.resume.skills.descriptions = inputElement.innerText
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
    }
    console.log('inputElement.innerText ', inputElement.innerText);
    const elemnt: any = document.getElementById(id);
    elemnt.style.height = 'auto';
    elemnt.style.height = elemnt.scrollHeight + 'px';
  }

  /**
   * addNew
   * @param value
   */
  addNew(value: any) {
    let firstWorkExperience = this.resumeValue.resume[value][0];
    let newWorkExperience: any = {};
    for (let key in firstWorkExperience) {
      if (firstWorkExperience.hasOwnProperty(key)) {
        newWorkExperience[key] = key === 'descriptions' ? [] : '';
      }
    }
    this.resumeValue.resume[value].push(newWorkExperience);
  }

  /**
   * exportToPDF
   */
  exportToPDF() {
    const element: any = document.getElementById('content');

    const originalOverflow = element.style.overflow;
    const originalHeight = element.style.height;

    element.style.overflow = 'visible';
    element.style.height = 'auto';

    const scrollHeight = element.scrollHeight;

    html2canvas(element, {
      scale: 4,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: scrollHeight,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      const pages = Math.ceil(scrollHeight / (pdfHeight * 2));
      for (let i = 0; i < pages; i++) {
        const position = -(i * pdfHeight);
        if (i > 0 && i < pages - 1) {
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        } else if (i === pages - 1 && pages > 1) {
          break;
        } else {
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        }
      }
      pdf.save(this.resumeValue.resume.profile.name + '.pdf');
      element.style.overflow = originalOverflow;
      element.style.height = originalHeight;
    });
  }

  /**
   * toggleColor
   * @param index 
   * @param array 
   */
  toggleColor(index: number, array: any) {
    array[index] = !array[index];
    if (!array[index]) {
      const firstFalseIndex = array.findIndex((circle: any) => !circle);
      if (firstFalseIndex !== -1) {
        array.fill(false, firstFalseIndex);
      }
    } else {
      const firstTrueIndex = array.lastIndexOf(true);

      if (firstTrueIndex !== -1) {
        for (let i = 0; i < firstTrueIndex; i++) {
          array[i] = true;
        }
      }
    }

  }

  /**
   * 
   * @param index 
   * @param array 
   * @returns 
   */
  isBlue(index: number, array: any): boolean {
    return array[index];
  }

  /**
   * themeColor
   * @param value 
   */
  themeColor(value:string){
    this.themeColorValue = value
    document.documentElement.style.setProperty("--theme-color", value);
  }

  /**
   * fontFamily
   * @param value 
   */

  fontFamily(value:any){
    this.fontFamilyValue  = value
    document.documentElement.style.setProperty("--font-family", value);
  }
  
  /**
   * fontValue
   * @param event 
   */
  fontValue(event:any){
      document.documentElement.style.setProperty("--font-size", event.target.value + 'px');
  }
/**
 * increaseSize
 * @param value 
 */
  increaseSize(value:any){
    this.fontSize = value
    document.documentElement.style.setProperty("--font-size", value + 'px');
  }

}
