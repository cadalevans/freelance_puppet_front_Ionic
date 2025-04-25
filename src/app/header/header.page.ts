import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
  standalone: false
})
export class HeaderPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

    @Input() showSearch = true;
    @Input() currentSegment: string = 'all';
  
    @Output() search = new EventEmitter<any>();
    @Output() segmentChange = new EventEmitter<string>();

    onSegmentChange(event: any) {
      const value = String(event.detail.value); // force to string
      this.segmentChange.emit(value);
    }

}
