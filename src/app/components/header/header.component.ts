import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonHeader, IonToolbar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input() showSearch = true;
  @Input() currentSegment: string = 'all';

  @Output() search = new EventEmitter<any>();
  @Output() segmentChange = new EventEmitter<string>();

  onSegmentChange(event: any) {
    const value = String(event.detail.value); // force to string
    this.segmentChange.emit(value);
  }

}
