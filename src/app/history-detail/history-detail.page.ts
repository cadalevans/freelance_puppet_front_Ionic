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

// to separate the category name with coma i can use angular's built-in join()
getCategoryNames(): string {
  return this.history?.categoryName.map((category: { name: any; }) => category.name).join(', ') || '';
}

getCategoryClass(category: string): string {
  const classes: { [key: string]: string } = {
    'anoying': 'category-anoying',
    'sleeping': 'category-sleeping',
    'shouting': 'category-shouting'
  };
  return classes[category] || 'category-default';
}

getRandomColor(): string {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF3', '#FFC300'];
  return colors[Math.floor(Math.random() * colors.length)];
}



}
