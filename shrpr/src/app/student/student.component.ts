import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {} from '@types/googlemaps';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

import { Course, CourseService, Student, StudentService, ValidationService } from '@app/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit, OnDestroy {

  student:Student;
  courses: Course[];
  studentCourse:Course[];
  courseCard: Course[] = [];
  private id:number;
  addressLength:number;
  private mylocation:string;
  private subscriptions = new Subscription();
  studentDetails:Student["details"];
  
  constructor(
    private studentService: StudentService, 
    private route: ActivatedRoute, 
    private courseService: CourseService,  
    private mapsAPILoader: MapsAPILoader,
  ) {

    
        let sub = this.subscriptions.add(this.route.params.subscribe((params: Params) => {
          this.id = params['id'];
          this.studentService.getStudent(this.id)
          .subscribe(
                (response) => {

                  this.student = response;
                  this.studentDetails = JSON.parse(response.details);
                  this.addressLength = response.addresses.length;
                },
                (error: Response) => console.log(error)
              )

          }));
      }
  ngOnInit() {
}



    ngOnDestroy(){
      this.subscriptions.unsubscribe();
    }
    

}
