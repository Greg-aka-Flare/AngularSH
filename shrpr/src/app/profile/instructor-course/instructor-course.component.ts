import { Component, OnInit, ViewChild, ElementRef, NgModule, Renderer } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

@Component({
  selector: 'app-instructor-course',
  templateUrl: './instructor-course.component.html',
  styleUrls: ['./instructor-course.component.css']
})
export class InstructorCourseComponent implements OnInit {
  //@ViewChild('panel') panel : ElementRef;

  @ViewChild('panel') panel : ElementRef
  
  slideNo: number = 1;
  lastSlideNo:number = 4;
  prevPos: string = '';
  nextPos:number = 0;

  constructor(public renderer: Renderer) { }

  ngOnInit() {
    
  }

  nextSlide(){
    
    if( this.slideNo > 0 && this.slideNo < this.lastSlideNo ){
      this.slideNo++;
      this.renderer.setElementStyle(
      this.panel.nativeElement, 
      'transform', 
      'translateX(-' + String((this.slideNo-1) * 100) + '%)');
    }
  }
  prevSlide(){
      if( this.slideNo >= 2 ){
        this.slideNo--;
        this.renderer.setElementStyle(
        this.panel.nativeElement, 
        'transform', 
        'translateX(-' + String((this.slideNo-1) * 100) + '%)');
      }
      else{
        this.renderer.setElementStyle(
          this.panel.nativeElement, 
          'transform', 
          'translateX(0px)');
      }
    }
  }



