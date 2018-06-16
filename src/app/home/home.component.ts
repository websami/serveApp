import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    
      trigger('itemsValuesA', [
        transition('* => *', [
          query(':enter', style({opacity: 0}), {optional: true}),

          query(':enter', stagger('300ms', [
            animate('.6s ease-in', keyframes([
              style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
              style({opacity: .5, transform: 'translateY(35px)', offset: .2}),
              style({opacity: 1, transform: 'translateY(0)', offset: 1}),
            ]))
          ]), {optional: true}),

          query(':leave', stagger('300ms', [
            animate('.6s ease-in', keyframes([
              style({opacity: 1, transform: 'translateY(0)', offset: 0}),
              style({opacity: .5, transform: 'translateY(35px)', offset: .2}),
              style({opacity: 0, transform: 'translateY(-75%)', offset: 1}),
            ]))
          ]), {optional: true})

        ])
      ])
  ]
})
export class HomeComponent implements OnInit {

  constructor(private _data: DataService) { }

  itemText: string = 'My first item';
  itemsValue = []; //no need to use this anymore since we created service
  btnText: string = 'Add an Item';

  private _itemCount: number; 
  public get itemCount(): number {
    return this._itemCount;
  }
  public set itemCount(value: number) {
    this._itemCount = value;
  }

  ngOnInit() {
    this._data.goal.subscribe(res => this.itemsValue = res);
    this.itemCount = this.itemsValue.length;
    this._data.changeGoal(this.itemsValue);
  }

  addItem() {
    this.itemsValue.push(this.itemText);
    this.itemText = '';
    this.itemCount = this.itemsValue.length;
    this._data.changeGoal(this.itemsValue);
  }

  removeItem(i) { 
    this.itemsValue.splice(i,1);
    this._data.changeGoal(this.itemsValue);
  }

}
