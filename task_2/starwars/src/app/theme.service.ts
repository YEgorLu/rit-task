import {Injectable, OnDestroy} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {BehaviorSubject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnDestroy {
  isMobile$: BehaviorSubject<boolean>;
  breakpointSub: Subscription;

  constructor(
    private breakPointObserver: BreakpointObserver
  ) {
    this.isMobile$ = new BehaviorSubject(false);
    this.breakpointSub = breakPointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((breakpoint) => {
        this.isMobile$.next(breakpoint.matches)
      })
  }

  ngOnDestroy() {
    this.breakpointSub.unsubscribe();
  }
}
