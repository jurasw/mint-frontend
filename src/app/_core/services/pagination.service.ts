import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class PaginationService {
  constructor() {}

  public onPageChange(
    pageNumber: number,
    router: Router,
    route: ActivatedRoute,
    scrollOptions?: ScrollToOptions
  ): void {
    const options = scrollOptions ? scrollOptions : { top: 0, left: 0 };
    window.scrollTo({ ...options });
    router.navigate([], {
      relativeTo: route,
      queryParams: { page: pageNumber },
    });
  }
}
