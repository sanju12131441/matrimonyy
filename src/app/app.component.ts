import { RouterModule, Router } from '@angular/router';
import { Component} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoginComponent } from '../app/login/login.component';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  toggled:boolean;
  animal: string = "zebra";
  name: string = "amit";
  socialInfo:string;
  routerUrl: string;
  constructor(public dialog: MatDialog, public router: Router) {
    this.routerUrl = location.pathname;
    console.log(location.pathname)
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      panelClass: 'app-full-bleed-dialog',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.socialInfo = result;
    });
  }
}
