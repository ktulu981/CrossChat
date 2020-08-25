import { ChannelService } from './../channel.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addchat',
  templateUrl: './addchat.component.html',
  styleUrls: ['./addchat.component.css']
})
export class AddchatComponent implements OnInit {
  channeladdform: FormGroup;
  constructor(public activeModal: NgbActiveModal, private channelservice: ChannelService,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.channeladdform = this._formBuilder.group({
      Name: ["", Validators.required],
     
    });
  }
  dismiss(){
    this.activeModal.close();
    }


    save(){

      this.channelservice.addChannel(this.channeladdform.value).subscribe(res=>{
        this.activeModal.close();
      },err=>{
        console.log(err);
        this.activeModal.close();
      })
    }
}
