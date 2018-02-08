import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TemplateService {

  search: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  demo: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
}