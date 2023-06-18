import {ChangeDetectionStrategy, Component} from '@angular/core';
import {IconService} from "./icon.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(iconService: IconService) {
  }
}
