import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SwapiService} from "./swapi-service/swapi.service";
import {IconService} from "./icon.service";
import {Observable} from "rxjs";
import {ListDTO} from "./swapi-service/interfaces/response/listDTO";
import {Planet} from "./swapi-service/interfaces/planet";



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
