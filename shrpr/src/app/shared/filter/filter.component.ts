import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1
      })),
      state('hide',   style({
        opacity: 0
      })),
      transition('show => hide', animate('200ms ease-out')),
      transition('hide => show', animate('200ms ease-in'))
    ])
  ]
})
export class FilterComponent implements OnInit {

	@Input('courses') courses: any[];
	@Output() onFilter: EventEmitter<any> = new EventEmitter();
	filterForm: FormGroup;
  showFilter: boolean = false;
	filtered: any[] = [];
	courseCount: number = 0;
	instructors: any[] = [];
  state: string = 'hide';

  constructor(public formBuilder: FormBuilder, public el: ElementRef) {}

  ngOnInit() {

    //get count
    this.courseCount = this.courses.length;

    //create form
    this.filterForm = this.formBuilder.group({
      'fun': [true],
      'work': [true],
      'kids': [true]
    });

    let i = 0;

  	//for each course, sort data
  	for(let course of this.courses){

  		//add to instructor array if doesn't exist already
  		if(!this.containsObject(course.instructor, this.instructors)){

	  		this.instructors.push(course.instructor);

        this.filterForm.addControl('instructor_' + i, new FormControl(true));

        ++i;
  		}
  	}
 
    //subscribe to changes
    this.filterForm.valueChanges.subscribe(  
      (form: any) => this.filter(form)
    );
  }

  @HostListener('window:scroll', ['$event']) checkScroll() {

    const componentPosition = this.el.nativeElement.parentElement.offsetTop;
    const scrollPosition = window.pageYOffset;

    if(scrollPosition >= componentPosition) {
      this.state = 'show'
    } else {
      this.state = 'hide'
    }
  }

  toggleFilter() {
    this.showFilter = (this.showFilter) ? false : true;
  }

  filter(form: any) {

  	//empty array
  	this.filtered = [];

  	//for each course, add to filtered array
		for(let course of this.courses){

			//check group
			switch (course.group.id) {
				case 1:
					if(!form.fun) continue;
					break;

				case 2:
					if(!form.work) continue;
					break;

				case 3:
					if(!form.kids) continue;
					break;
  		}

  		//add to filtered array
  		this.filtered.push(course);
  	}

  	//get count
  	this.courseCount = this.filtered.length;

  	//emit new data
  	this.onFilter.emit(this.filtered);
  }

	private containsObject(obj, list) {
	    let i;

	    for(i = 0; i < list.length; i++) {

	        if (list[i].id === obj.id) {
	            return true;
	        }
	    }

	    return false;
	}
}