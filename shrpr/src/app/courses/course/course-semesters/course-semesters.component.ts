import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from '../../../courses/course.service';

@Component({
  selector: 'app-course-semesters',
  templateUrl: './course-semesters.component.html',
  styleUrls: ['./course-semesters.component.css']
})
export class CourseSemestersComponent implements OnInit {
  @Input('course') course: any;
  constructor(private courseService: CourseService) { }

  ngOnInit() {
  }

}
