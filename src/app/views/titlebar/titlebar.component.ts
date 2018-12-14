import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { mergeMap, filter, map, merge } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss']
})
export class TitlebarComponent implements OnInit, OnDestroy {
  activeRouteSegment: string;
  activeRouteSegmentSubscription: Subscription;
  isLogged: boolean;

  constructor(
    private dataService: DataServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const self = this;
    this.startObservingActiveRoute();
    this.isLogged = this.dataService.isLoggedIn;
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

  logout() {
    this.dataService.logout();
    this.router.navigate(['/public']);
  }
}
