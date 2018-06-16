import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  
  private itemsValue = new BehaviorSubject<any>(['The initial goal', 'Another silly life sample']);
  goal = this.itemsValue.asObservable();

  constructor() { }

  changeGoal(goal) {
    this.itemsValue.next(goal); 
  }

}
