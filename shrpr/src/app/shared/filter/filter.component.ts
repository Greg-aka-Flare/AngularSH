import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
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
export class FilterComponent implements OnInit, AfterViewInit {

	@Input('courses') courses: any[];
	@Output() onFilter: EventEmitter<any> = new EventEmitter();
	filterForm: FormGroup;
  showFilter: boolean = false;
	filtered: any[] = [];
	courseCount: string = 'No Courses';
	instructors: any[] = [];
  topics: any[] = [];
  state: string = 'hide';
  @ViewChildren('fieldset') fieldsets: QueryList<any>;

  constructor(
    private fb: FormBuilder, 
    private el: ElementRef, 
    private renderer: Renderer2
  ) {}

  ngOnInit() {

    //get course count
    this.courseCount = this.getCourseCount(this.courses.length);

    //create form
    this.filterForm = this.fb.group({
      'fun': [true],
      'work': [true],
      'kids': [true]
    });

    let i = 0;

  	//for each course, sort data
  	for(let course of this.courses){

      for(let category of course.categories){

        //add to topics array if doesn't exist already
        if(!this.containsObject(category, this.topics)){

          this.topics.push(category);

          this.filterForm.addControl('topic_' + category.id, new FormControl(true));

          ++i;
        }
      }

  		//add to instructors array if doesn't exist already
  		if(!this.containsObject(course.instructor, this.instructors)){

	  		this.instructors.push(course.instructor);

        this.filterForm.addControl('instructor_' + course.instructor.id, new FormControl(true));

        ++i;
  		}
  	}
 
    //subscribe to changes
    this.filterForm.valueChanges.subscribe(  
      (form: any) => this.filter(form)
    );
  }

  ngAfterViewInit() {

    //for each fieldset
    this.fieldsets.forEach(fieldset => {

      //get elements
      let opened = false;
      let toggle = fieldset.nativeElement.querySelector('.toggle');
      let options = fieldset.nativeElement.querySelector('.options');
      let inputs = options.querySelectorAll('input');
      let icon = toggle.querySelector('i');
      let all = fieldset.nativeElement.querySelector('.all');
      let none = fieldset.nativeElement.querySelector('.none');
      let group = fieldset.nativeElement.getAttribute('group');

      //close initially
      this.renderer.addClass(options, 'closed');

      //on toggle click
      this.renderer.listen(toggle, 'click', () => {

        //check if opened, toggle classes
        if(opened){

          opened = false;
          
          this.renderer.removeClass(icon, 'fa-angle-down');
          this.renderer.addClass(icon, 'fa-angle-right');
          this.renderer.addClass(options, 'closed');
        }
        else{

          opened = true;

          this.renderer.removeClass(icon, 'fa-angle-right');
          this.renderer.addClass(icon, 'fa-angle-down');
          this.renderer.removeClass(options, 'closed');
        }
      });

      //on all click
      this.renderer.listen(all, 'click', () => {
        
        let obj = {};

        for(let input of inputs) input.checked = true;

          switch(group) {
            case 'categories':
              this.filterForm.patchValue({
                'fun': true,
                'work': true,
                'kids': true
              })
            break;
            case 'topics':
              for(let topic of this.topics){
                let key = 'topic_' + topic.id;

                obj[key] = true;
              }

              this.filterForm.patchValue(obj);
            break;
            case 'instructors':
              for(let instructor of this.instructors){
                let key = 'instructor_' + instructor.id;

                obj[key] = true;
              }

              this.filterForm.patchValue(obj);
            break;
        }
      });

      //on none click
      this.renderer.listen(none, 'click', () => {
        
        let obj = {};

        for(let input of inputs) input.checked = false;

          switch(group) {
            case 'categories':
              this.filterForm.patchValue({
                'fun': false,
                'work': false,
                'kids': false
              })
            break;
            case 'topics':
              for(let topic of this.topics){
                let key = 'topic_' + topic.id;

                obj[key] = false;
              }

              this.filterForm.patchValue(obj);
            break;
            case 'instructors':
              for(let instructor of this.instructors){
                let key = 'instructor_' + instructor.id;

                obj[key] = false;
              }

              this.filterForm.patchValue(obj);
            break;
        }
      });
    });
  }

  @HostListener('window:scroll', ['$event']) checkScroll() {

    const componentPosition = this.el.nativeElement.parentElement.offsetTop;
    const scrollPosition = window.pageYOffset;

    //show or hide based on scroll position
    this.state = (scrollPosition >= ( componentPosition ) - 500) ? 'show' : 'hide';
  }

  toggleFilter() {
    this.showFilter = (this.showFilter) ? false : true;
  }

  filter(form: any) {

  	//empty array
  	this.filtered = [];

  	//for each course, add to filtered array
		checkCourse: for(let course of this.courses){

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

      //if instructor is not selected, continue to next
      if(!form['instructor_' + course.instructor.id]) continue;

      //check if categories are selected
      for(let category of course.categories){

        if(!form['topic_' + category.id]) continue checkCourse;
      }

  		//add to filtered array
  		this.filtered.push(course);
  	}

  	//get count
  	this.courseCount = this.getCourseCount(this.filtered.length);

  	//emit new data
  	this.onFilter.emit(this.filtered);
  }

  private getCourseCount(count: number): string {

    if(count) {
      if(count === 1) {
        return '1 Course';
      }
      else {
        return count + ' Courses';
      }
    }
    else {
      return 'No Courses';
    }
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