import { Component, OnInit, ComponentFactoryResolver, ComponentRef, ViewChild } from '@angular/core';
import { ContentDirective } from './content.directive';
import { eventConstant } from '../../constants/event.constant';
import { diaglogType } from '../../constants/diaglog.constant';
import { BroadcasterService } from '../services/broadcaster.service';
import { GlobalService } from '../services/global.service';

import{ LoginDialogComponent } from './login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @ViewChild(ContentDirective) public contentDirective: ContentDirective;
  public componentRef: ComponentRef<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private $broadcaster: BroadcasterService,
    private global: GlobalService) { }

  ngOnInit() {
    this.$broadcaster.register(eventConstant.OPENDIALOG, this.loadComponent.bind(this));
    this.$broadcaster.register(eventConstant.CLOSEDIALOG, this.closeDialog.bind(this));
  }

  public loadComponent(dialogtype: string) {
    this.global.displayDialog = !this.global.displayDialog;
    document.body.setAttribute('style', 'overflow: hidden');
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(getComponent(dialogtype));
    let viewContainerRef = this.contentDirective.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    // componentRef.instance.data = 
  }

  public closeDialog() {
    document.body.setAttribute('style', null);
    this.global.displayDialog = !this.global.displayDialog;
    this.componentRef.destroy();
  }

}

function getComponent(dialogtype: string) : any{

  switch (dialogtype) {
    case diaglogType.lOGIN:
      return LoginDialogComponent;
    case diaglogType.REGISTERATION:
      return RegisterDialogComponent
    default:
      return LoginDialogComponent;
  }
}


