import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

const SMALL_WIDTH_BREAKPOINT = 768;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit , OnChanges {
  opened! : boolean;
  isScreenSmall! : boolean;
  @Input() isLoading!: number;
  loading : boolean = true;
  @ViewChild(MatSidenav) sidenav! : MatSidenav;
  constructor(private _breakPointObserver : BreakpointObserver , private router : Router) { }

  ngOnChanges(changes: any): void {
    if(changes.isLoading.currentValue == 2){
      this.loading = false;
    }else{
      this.loading = true;
    }
  }

  ngOnInit(): void {
    this._breakPointObserver.observe([`(max-width : ${SMALL_WIDTH_BREAKPOINT}px)`]).subscribe(
      (state : BreakpointState)=> {
        this.isScreenSmall = state.matches;
      }
    )
    this.router.events.subscribe(() => {
      if(this.isScreenSmall){
        this.sidenav.close()
      }
    })
  }

}
