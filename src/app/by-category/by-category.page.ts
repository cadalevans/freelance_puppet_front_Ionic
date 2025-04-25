import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-by-category',
  templateUrl: './by-category.page.html',
  styleUrls: ['./by-category.page.scss'],
  standalone: false
})
export class ByCategoryPage implements OnInit {

  categoriesWithHistories: { name: string, histories: any[] }[] = [];

  constructor(private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe((categories: any[]) => {
      categories.forEach(category => {
        this.categoryService.getHistoriesByCategory(category.name).subscribe(histories => {
          // Adjust image paths
          const adjustedHistories = histories.map((history: { image: any; }) => ({
            ...history,
            image: `${environment.apiUrl}${history.image}`
          }));
  
          // Push category + adjusted histories
          this.categoriesWithHistories.push({
            name: category.name,
            histories: adjustedHistories
          });
        });
      });
    });
  }
  

      // go to history detail page 

      goToHistoryDetail(historyId: number) {
        this.router.navigate(['/tabs/history-detail', historyId]);
      }

      onSegmentChanged(value: string) {
        if (value === 'all') {
          this.router.navigate(['/tabs/home']);
        } else {
          this.router.navigate(['/tabs/by-category']);
        }
      }
      
}
