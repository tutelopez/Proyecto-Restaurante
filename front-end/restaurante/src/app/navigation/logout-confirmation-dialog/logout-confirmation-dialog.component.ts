import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/auth/user.service.service';
@Component({
  selector: 'app-logout-confirmation-dialog',
  templateUrl: './logout-confirmation-dialog.component.html',
})
export class LogoutConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<LogoutConfirmationDialogComponent>,
    private router: Router,
    private userService: UserServiceService,) {}

  confirmLogout(): void {
    this.userService.logOut()
        .then(() =>{
          this.router.navigate(['/login']);
          this.dialogRef.close(true)
        })
        .catch(error => console.log(error));
  }

  cancelLogout(): void {
    this.dialogRef.close(false);
  }
}
