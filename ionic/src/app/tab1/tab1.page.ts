import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Users, UsersService } from '../services/users.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  loginForm: FormGroup;
  allUser: Users[] = []
  constructor(private userSrv: UsersService, private actionSheetController: ActionSheetController, 
    private alertController: AlertController, private route: Router) {}

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.userSrv.all().subscribe(res => {
      this.allUser = res.users;
    })
  }

  crearUser() {
    this.route.navigateByUrl('tabs/crear-user')
  }

  async presentActionSheet(id: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.userSrv.destroy(id).subscribe(async res => {
            const alert = await this.alertController.create({
              header: 'Alert',
              message: 'Listo, se eliminó',
              buttons: ['Cancel']
            });

            this.initData();
        
            await alert.present();
          })
        }
      },
      {
        text: 'Editar',
        icon: 'caret-forward-circle',
        handler: () => {
          this.route.navigateByUrl(`tabs/edit-user/${id}`)
        }
      }, 
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
 
}
