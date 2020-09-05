import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { List } from '../model/list';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html'
})

export class TabComponent {

    lists: any;
    userForm: FormGroup;

    constructor(private _httpClient: HttpClient,
    private _formBuilder: FormBuilder,
    private _userService: UserService){}

    ngOnInit(){
      this.initForm();
      this.listOfCards();
    }

    /**
    * @description Get all the cards lists
     */
    listOfCards(){
      this._httpClient.get("assets/fund.json").subscribe(data => {
          this.lists = data;
      });
    }

    /**
    * @description Create userform controls and validation
     */
    initForm(){
      this.userForm = this._formBuilder.group({
          email: ['', {
              validators: [
                  Validators.required
              ]
          }],
          password: ['', {
              validators: [
                  Validators.required
              ]
          }],
          check_me: ['']
      });
    }

    /**
    * @description Submit form after click on submit button
     */
    submit(){
      const data = this.userForm.value;
      if(this.userForm.valid){
        this._userService.submitForm(data).then(res => {
            console.log(res);
        });
      }
    }
}