import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private http:HttpClient) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });
  }

  login() {

    const value = this.loginForm.value;

    this.http.post('http://localhost:8000/api/auth/login', {mail: value.email, password: value.password}).subscribe((res: any) => {
      if (res.access_token) {
        localStorage.setItem('access_token', res.access_token);
        this.router.navigateByUrl('/tabs/tab1');
      }
    })


    // console.log('what is goin on');
    // console.log(this.loginForm.value);
    // this.router.navigateByUrl('/tab');
  }

}
