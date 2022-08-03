import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sjss-super-jss',
  template: `
    <div [sj]="{padding:'35px'}">
       <h1 [sj]>sd</h1>
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
