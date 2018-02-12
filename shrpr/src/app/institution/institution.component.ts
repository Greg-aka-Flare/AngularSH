import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Institution, InstitutionService } from '@app/core';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.css']
})
export class InstitutionComponent implements OnInit, OnDestroy {

  institutions:any;
  private id:number;
  courses: any[];
  courseData: any;
  private subscriptions = new Subscription();
  details:any;
  
  constructor(private institutionService: InstitutionService, private route: ActivatedRoute) { 
    //subscribe the param value
    let sub = this.subscriptions.add(this.route.params.subscribe((params: Params) => {
      //get the param value
        this.id = params['id'];
        //get institution with institution id
        this.institutionService.getInstitution(this.id)
        .subscribe(
          (response) => {
            //fill the institutes array with response
            this.institutions = response;
            //parse the detail data in json form
            this.details = JSON.parse(response.details);
            //get all courses of institute in course array
            this.courses = this.institutions.courses;
            this.courseData = this.courses;
            },
          (error: Response) => console.log(error)
        );
    }));
    
  }
  
  ngOnInit() {
     
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

  filter(courses){
    this.courseData = courses;
  }
}