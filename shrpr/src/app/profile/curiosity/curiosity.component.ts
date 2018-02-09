import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Course, CourseService, CuriousService, User } from '@app/core';
import { NullAstVisitor } from '@angular/compiler';

@Component({
  selector: 'app-curiosity',
  templateUrl: './curiosity.component.html',
  styleUrls: ['./curiosity.component.css']
})
export class CuriosityComponent implements OnInit, OnDestroy {
  @Input('user') user: User;
  //array to hold all courses
  allCourses: any[];
  //array to hold all courses after filter binded with the counter for view more function
  mycourses: Course[] = [];
  //array to hold all filtered coures
  filtercourses: Course[] = [];
  //variable to check view more limit
  counter:number = 0;
  //variable to hold all subscription
  private subscriptions = new Subscription();
  //variable to hold sort group id while sorting
  selectedIndex:number;
  //variable For sticky filter box
  isfilterShrunk: boolean = false;
  constructor(
    private curious: CuriousService,
    private courseService: CourseService
  ) { }
//Window scroll Function For sticky filter box
  @HostListener('window:scroll')onscroll = () => {
    if(window.pageYOffset > 0) {
         this.isfilterShrunk = true;
    } else {
         this.isfilterShrunk = false;
    }
  }

  ngOnInit() {
    //api call to get all like coures
    this.subscriptions.add(this.courseService.getLikeCourse().subscribe(courses => {
      //get all courses from api
      this.allCourses = courses;
      //get all course from api to use in filtering
      this.filtercourses = courses;
      //function to fill array with counter limit which is 6
      this.allCourseInit();
      
     }));
  }
  //function to initialize mycoureses array with counter limit
  allCourseInit(){
    //set the counter zero 
    this.counter = 0;
    //check if we have array ready for filter
    if(this.filtercourses){
      for(var j = 0, l = this.filtercourses.length; j < l; j=j)
      {
        this.mycourses.push(this.filtercourses[j]);
        j++;
        if(j%6 == 0) break;
      }
      this.counter += 6;
    }
  }
//function to remove course card
removeLike(course, i) {
  this.subscriptions.add(this.curious.dislike(course.id).subscribe(
        success => {
          console.log('removed');
        },
        error => {
          //log error
          console.log(error);
        }
      ));
}
//function to load next 6 course on view more click 
  getData(){
    for(var k = this.counter, p = this.filtercourses.length; k < p; k=k)
    {
      this.mycourses.push(this.filtercourses[k]);
      k++;
    if(k%6 == 0) break;
    }
    this.counter+=6;
  }
//function to sort the courses by cliked group
  sortbyGroup(id: number) {
    //get the group id for sorting
    this.selectedIndex = id;
    //empty the mycourse array to hold new filtered array by group which is limited by counter
    this.mycourses = [];
    //empty the filtercourse array to hold all filtered coures by group
    this.filtercourses = [];
    //fill filter course array with all courses
    this.filtercourses = this.allCourses;
    //get all filtered course by group id
    this.filtercourses = this.filtercourses.filter((course: any) => course.group.id === id);
    //call allCourseInit function to load first 6 courses to mycourse array
      this.allCourseInit();
    }
    //function to destroy all subscription    
    ngOnDestroy(){
      this.subscriptions.unsubscribe();
  }

}
