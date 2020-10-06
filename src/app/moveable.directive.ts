import { Directive, ElementRef, HostBinding, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appMoveable]'
})
export class MoveableDirective implements OnChanges {
  dragItem: any;
  @Input() public CreateBoxCount: number;
  @Input() public EnabaleDrag: boolean;
  container: any;

  constructor(private el: ElementRef) {}
  getSelectedBox(){
    return document.querySelector('.moveable.active');
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.CreateBoxCount)
      this.addRectBox()
    if(changes.EnabaleDrag)
    {
      if(changes.EnabaleDrag.currentValue)
      {
        this.el.nativeElement.onclick=this.select.bind(this);
        document.onkeydown=this.dragStart.bind(this);
        console.log("added");
      }
      else{
          this.el.nativeElement.onclick=null;
          document.onkeydown=null;
          console.log("removed");
      }
    }
  }

  addRectBox(){
    let row = document.createElement('span'); 
    this.container=this.el.nativeElement;
      row.className = 'moveable active'; 
      row.id="movable"+this.CreateBoxCount;
      row.style.zIndex=this.CreateBoxCount.toString();
      this.select(null);
      this.container.appendChild(row); 
  }
  
  select(e)
  {
    let activeBox=this.getSelectedBox();
    if(!(activeBox===e?.srcElement)){
      e?.srcElement?.classList.add("active");
    }
    activeBox?.classList.remove("active");
  }

  dragStart(e) {
    this.dragItem=this.getSelectedBox();
    if(this.dragItem)
      this.drag(e);
  }

  drag(e) {
      switch (e.keyCode) {
        case 65://a
          this.setStyleLeft(this.dragItem.offsetLeft-10);
          break;
        case 68://d
          this.setStyleLeft(this.dragItem.offsetLeft+10);
        break;
        case 83://s
          this.setStyleTop(this.dragItem.offsetTop+10);
        break;
        case 87://w
          this.setStyleTop(this.dragItem.offsetTop-10);
        break;
        case 46://delete
          this.container.removeChild(this.dragItem);
        default:
          break;
      }
  }

  CheckIfElementInBoundaryHorizontal(leftValue){
    return leftValue>=0 && leftValue<(this.el.nativeElement.clientWidth-this.dragItem.clientWidth)
  }

  CheckIfElementInBoundaryVertical(topValue){
    return topValue>=0 && topValue<(this.el.nativeElement.clientHeight-this.dragItem.clientHeight)
  }

  setStyleLeft(value){
    if(this.CheckIfElementInBoundaryHorizontal(value))
      this.dragItem.style.left= `${value}px`;
  }

  setStyleTop(value){
    if(this.CheckIfElementInBoundaryVertical(value))
      this.dragItem.style.top= `${value}px`;
  }
}
