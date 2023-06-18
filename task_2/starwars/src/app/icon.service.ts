import { Injectable } from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

const iconFolder = '../assets/icons/';
const getPath = (fileName: string): string => `${iconFolder}${fileName}`;

const icons: IconConfig[] = [
  {name: 'starwars-logo', path: getPath('starwars-logo.svg')}
];

interface IconConfig {
  name: string;
  path: string;
}


@Injectable({
  providedIn: 'root'
})
export class IconService {


  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    icons.forEach(this.registerIcon.bind(this));
  }

  private registerIcon({name, path}: IconConfig): void {
    this.matIconRegistry.addSvgIcon(
      name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(path)
    );
  }
}
