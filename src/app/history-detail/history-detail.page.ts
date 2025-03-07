import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryService } from '../history.service';
import { UserHistory } from '../home/history';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.page.html',
  styleUrls: ['./history-detail.page.scss'],
  standalone: false
})
export class HistoryDetailPage implements OnInit {

  constructor(
  private route: ActivatedRoute,
  private historyService: HistoryService
              
  ) { }

  history: any;

  ngOnInit() {
    const historyId = this.route.snapshot.paramMap.get('id'); // Get ID from URL
    if (historyId) {
      this.getHistoryById(+historyId); // Convert ID to number
    }
  }

  getHistoryById(id: number) {
    this.historyService.getHistoryById(id).subscribe(
      (data) => {
        this.history = {
          ...data,
          image: `${environment.apiUrl}${data.image}` // Append base URL only once
        };
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
