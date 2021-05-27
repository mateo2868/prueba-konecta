import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Users, UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent implements OnInit {
  userForm: FormGroup;
  rolesList = [
    {txt: 'Vendedor', value: 2},
    {txt: 'Cliente', value: 3}
  ];
  verFormulario = false;
  @Input() editForm = false;
  @Input() editUser: Users = {} as Users;

  constructor(private formBuilder: FormBuilder, private userSrv: UsersService, private alertController: AlertController) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      document: ['', Validators.required],
      mail: ['', Validators.required, Validators.email],
      direction: [''],
      rol: ['', Validators.required]
    });


    this.userSrv.show().subscribe(res => {
      if (res.rol !== 3) {
        this.verFormulario = true;
        if (res.rol === 1) {
          this.rolesList.unshift({txt: 'Admin', value: 1})
        }
      }
    });
  }

  onSubmit() {
    this.userSrv.store(this.userForm.value).subscribe(async (res: any) => {
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Listo, se guardó',
        buttons: ['Cancel']
      });
  
      await alert.present();
    })
  }


}
