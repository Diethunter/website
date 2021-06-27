import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-userlink',
  templateUrl: './userlink.component.html',
  styleUrls: ['./userlink.component.css']
})
export class UserlinkComponent implements OnInit {

  constructor() { }

  @Input() username = ""

  ngOnInit(): void {
  }

}
