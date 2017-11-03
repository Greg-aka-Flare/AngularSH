import { Component, OnInit } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import { Response } from "@angular/http";
import { ActivatedRoute, Params } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

import { Student } from "../student.interface";
import { StudentService } from '../student.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students:any[];
  private studentid:number;

  constructor(private studentService: StudentService, private route: ActivatedRoute ) {
    let sub = this.route.params.subscribe((params: Params) => {
      this.studentid = params['id'];
      console.log('param id: ' + this.studentid);
    })
   }

  ngOnInit() {
    this.studentService.getStudent(this.studentid)
      .map(
        (response) => {
          this.students = response;
          console.log(this.students)
        },
        (error: Response ) => console.log(error)
      );
  }

}
