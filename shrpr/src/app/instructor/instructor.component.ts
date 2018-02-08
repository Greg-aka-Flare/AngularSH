import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';
import { Instructor, InstructorService } from '@app/core';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})

export class InstructorComponent implements OnInit {

  instructor: Instructor;
  
  constructor(
    private instructorService: InstructorService, 
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.instructorService.get(params['id']).subscribe(instructor => this.instructor = instructor);
    });
  }

  goTo(location: string): void {
    window.location.hash = location;
  }
}