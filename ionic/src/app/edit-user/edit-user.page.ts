import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Users, UsersService } from '../services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  user: Users;
  constructor(private formBuilder: FormBuilder, private userSrv: UsersService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((res: any) => {
      this.userSrv.edit(res.params.id).subscribe(user => {
        this.user = user;
      })
    })



    
  }

  onSubmit() {

  }

}
