import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sjss-super-jss',
  template: `
    <div [sJss]="{padding:'35px'}">
       <h1 [sJss]>sd</h1>
    </div>
  `,
  styles: [
  ]
})
export class SuperJssComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
