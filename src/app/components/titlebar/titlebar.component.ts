import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { mergeMap, filter, map, merge } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss']
})
export class TitlebarComponent implements OnInit, OnDestroy {
  activeRouteSegment: string;
  activeRouteSegmentSubscription: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const self = this;
    this.startObservingActiveRoute();
  }

  ngOnDestroy() {
    if (this.activeRouteSegmentSubscription) {
      this.activeRouteSegmentSubscription.unsubscribe();
    }
  }

  private startObservingActiveRoute() {
    const self = this;
    if (this.activatedRoute.url) {
      this.activeRouteSegmentSubscription = this.activatedRoute.url
        .pipe(
          map(segments => segments.join('/')),
          merge(
            this.router.events.pipe(
              filter(event => event instanceof NavigationEnd),
              map(() => this.activatedRoute),
              map(route => route.firstChild),
              mergeMap(route => route.url),
              map(segments => segments.join('/'))
            )
          )
        )
        .subscribe(s => {
          self.activeRouteSegment = s;
        });
    }
  }
}
