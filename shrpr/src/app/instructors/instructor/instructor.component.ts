import { Component, OnInit, OnDestroy, NgModule  } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TabsComponent } from "../../shared/tabs/tabs.component";
import { StarRatingModule } from 'angular-star-rating';
import { Subscription } from 'rxjs/Subscription';
import { Course } from "../../courses/course.interface";
import { CourseService } from "../../courses/course.service";
import { Instructor } from "../instructor.interface";
import { InstructorService } from "../instructor.service";


@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})

export class InstructorComponent implements OnInit, OnDestroy {
  instructors:Instructor;
  courses: Course[];
  courseCard:any[] = [];
  private myid:number;
  reviewCount:number;
  ratingData:Instructor["ratings"];
  reviewRating:number;
  userRating:number = 0;
  loopCounter:number = 0;
  reviewRatingGross:number;
  ratingDataParse:string;
  private subscriptions = new Subscription();
  instrocterdata:string;
  courseCardLength:number;
  reviewshowHide:boolean = false;
  instructorCourse:any[]=new Array();
  counter:number = 0;
  loggedIn: boolean = false;
  details:string;
  
  constructor(
    private instructorService: InstructorService,
    private route: ActivatedRoute, 
    private courseService: CourseService,  
  ) { 

    let sub = this.subscriptions.add(this.route.params.subscribe((params: Params) => {
      this.myid = params['id'];
    }))
    
  }
  
  ngOnInit() {
    //get instructor's courses in which he is involved
    this.subscriptions.add(this.courseService.getCourses()
    .subscribe(
      (courses) => {
       this.courses = courses;
       if(this.courses){
        for(let i = 0; i < this.courses.length; i++) {
          if( this.courses[i].instructor["id"] == this.myid){
              this.courseCard.push(this.courses[i]);
          } 
        }
        for(var j = this.counter, l = this.courses.length; j < l; j=j)
        {
          if(this.courseCard[j]){
            this.instructorCourse.push(this.courseCard[j]);
          }
          j++;
          if(j%3 == 0) break;
        }
        this.counter += 3;
      }
      },
      (error: Response) => console.log(error)
      
    ));
    //subscribe the instructor from its id on page load
    this.subscriptions.add(this.instructorService.getInstructor(this.myid)
     .subscribe(
       (instructors) => {
        this.instructors = instructors;
        this.ratingData = this.instructors.ratings;
        this.details = JSON.parse(instructors.details);
        this.reviewCount = this.ratingData.length;
        this.loopCounter = this.reviewCount+1;
        for(var k=0; k < this.reviewCount; k++){
            this.userRating += this.ratingData[k].rating;
        }
        this.reviewRatingGross = this.userRating/this.reviewCount;
        },
       (error: Response) => console.log(error)
     ));

  }
  //function to jump on an id in the page
  goTo(location: string): void {
    window.location.hash = location;
  }
  //click on view more function to load next three courses of the instructor
  getData(){
    for(var k = this.counter, p = this.courses.length; k < p; k=k)
    {
      if(this.courseCard[k]){
      this.instructorCourse.push(this.courseCard[k]);
      }
      k++;
    if(k%3 == 0) break;
    }
    this.counter+=3;
  }
  
  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}