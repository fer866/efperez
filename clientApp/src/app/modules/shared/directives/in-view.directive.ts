import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[efpdInView]'
})
export class InViewDirective {
  alreadyRendered: boolean = false;

  constructor(
    private vRef: ViewContainerRef,
    private tRef: TemplateRef<any>
  ) { }

  ngAfterViewInit(): void {
    const el = this.vRef.element.nativeElement;
    const elToObserve = el.parentElement;
    this.setMinWidthHeight(elToObserve);

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        this.renderContents(entry.isIntersecting);
      });
    }, { threshold: 1 });

    observer.observe(elToObserve);
  }

  private renderContents(isInView: boolean): void {
    if (isInView && !this.alreadyRendered) {
      this.vRef.clear();
      this.vRef.createEmbeddedView(this.tRef);
      this.alreadyRendered = true;
    }
  }

  private setMinWidthHeight(el: any): void {
    const style = window.getComputedStyle(el);
    const [width, height] = [parseInt(style.width), parseInt(style.height)];
    !width && (el.style.minWidth = '40px');
    !height && (el.style.minHeight = '40px');
  }

}
