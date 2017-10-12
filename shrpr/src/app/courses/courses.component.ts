import { Component, OnInit } from '@angular/core';
import { Response } from "@angular/http";


import { Course } from "../course.interface";
import { CourseService } from "../course.service"

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[];

  constructor(private courseService: CourseService) {
     
  }

  ngOnInit() {
      this.courseService.getCourses()
      .subscribe(
        (courses: Course[]) => this.courses = courses,
        (error: Response) => console.log(error)
      );
  }

  /*onGetCourses(){
    this.courseService.getCourses()
      .subscribe(
        (courses: Course[]) => this.courses = courses,
        (error: Response) => console.log(error)
      );
  }*/

  onDeleted(course: Course){
    const position = this.courses.findIndex(
      (courseEl: Course) => {
        return courseEl.id == course.id;
      }
    );
    this.courses.splice(position, 1);
  }

  // constant for swipe action: left or right
  isVisible:boolean = false;
  isHide:boolean = true;

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  // action triggered when user swipes
    swipe(currentIndex: number, action = this.SWIPE_ACTION.RIGHT) {
        // out of range
        if (currentIndex > this.courses.length || currentIndex < 0) return;
        this.isVisible = !this.isVisible;
        this.isHide = !this.isHide;

        let nextIndex = 0;

        // swipe right, next avatar
        if (action === this.SWIPE_ACTION.RIGHT) {
            const isLast = currentIndex === this.courses.length - 1;
            nextIndex = isLast ? 0 : currentIndex + 1;

        }

        // swipe left, previous avatar
        if (action === this.SWIPE_ACTION.LEFT) {
            const isFirst = currentIndex === 0;
            nextIndex = isFirst ? this.courses.length - 1 : currentIndex - 1;
        }

        // toggle avatar visibility

        //this.courses.forEach((x, i) => x. = (i === nextIndex));
    }
}


