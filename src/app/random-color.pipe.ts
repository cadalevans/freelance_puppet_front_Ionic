import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomColor',
  standalone: true,
  pure: true // Ensures the pipe runs only when the input changes
})
export class RandomColorPipe implements PipeTransform {

  private colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF3', '#FFC300'];

  /*
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
  */

  transform(value: string,): string {
    // Generate a stable color based on category name
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = value.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % this.colors.length);
    return this.colors[index];
  }
    
  

}
