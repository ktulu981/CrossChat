import { Message } from './../models/message';
import { AuthService } from './../services/auth.service';
import { AddchatComponent } from './addchat/addchat.component';
import { ChannelService } from "./channel.service";
import { Component, OnInit, NgZone, ViewChild, ChangeDetectorRef } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ChatService } from './chat.service';
import { JoinService } from './join.service';


@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],

})
export class ChatComponent implements OnInit {
  channels= new Array<any>();
  myChannels= new Array<any>();
  openChannels= new Array<any>();
  activeChannel: any;
  user: any;
  txtMessage = ''; 
  message: Message;

 
  
  constructor(private channelService: ChannelService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private authservice: AuthService,
    private chatService: ChatService,
    private joinService: JoinService,
    private _ngZone: NgZone,
  
    private readonly changeDetector: ChangeDetectorRef) { this.subscribeToEvents();   }
 
  ngOnInit() {
    this.loadChannels();
    this.user=this.authservice.currentUserValue;
  }

  private subscribeToEvents(): void {  
  
    this.chatService.messageReceived.subscribe(data => {  
     
      this._ngZone.run(() => {  
        if (data.SenderId !== this.user.Id) {  

          const channel = this.openChannels.filter(x => x.Id == data.ChannelId);
          if (channel.length > 0) {

            channel[0].Messages.push(data); 
          }

          
        }  
      });  
    });


    this.joinService.messageReceived.subscribe(data => {
      this._ngZone.run(() => {
        console.log(data);
        const channel = this.openChannels.filter(x => x.Id == data.ChannelId);
        if (channel.length > 0) {

          channel[0].ChannelUsers.push(data);
        }

      });

    });
  }  

  loadChannels() {
    this.channelService.getChannels().subscribe(
      (res) => {
        this.channels = res;
        this.myChannels=this.channels.filter(x=>x.CreatorId==this.user.Id);
      },
      (err) => {}
    );
  }


  AddChannel(){
    const modalRef = this.modalService.open(AddchatComponent);
   

    modalRef.result.then((result) => {
   
        this.loadChannels();
    
      });
  }

  LeaveChannel(event: MouseEvent,id) {
    const index: number = this.openChannels.findIndex(
      d => d.Id === id
    );
    this.openChannels.splice(index, 1);
    event.preventDefault();
    event.stopImmediatePropagation();
  }

DeleteChannel(id){
        this.channelService.deleteChannel(id).subscribe(res=>{
            if(res.Status){
              const index: number = this.myChannels.findIndex(
                d => d.Id === id
            );
            this.myChannels.splice(index, 1);


            const index1: number = this.openChannels.findIndex(
              d => d.Id === id
          );
          
          this.openChannels.splice(index1, 1);

          const index3: number = this.channels.findIndex(
            d => d.Id === id
        );
        this.channels.splice(index3, 1);
            
              this.toastr.success('Delete Success', 'Success');
            }
        },err=>{
          this.toastr.error('Delete Failed', 'Error');
        });
  }

  Join(channel) {

    var ch = this.openChannels.filter(x => x.Id == channel.Id);
    if (ch.length > 0)
      return;
    this.getChannelById(channel.Id);
  
    this.joinService.sendMessage({ UserId: this.user.Id,ChannelId: channel.Id});  

    //this.channelService.joinChannel(channel.Id).subscribe(res => {
    //  this.openChannels.push(res);
    //  this.activeChannel = res;

    //}, err => {

    //});

  
  }

  getChannelById(id){
   
    this.channelService.getChannel(id).subscribe(res=>{
  
      this.openChannels.push(res);
      this.activeChannel=res;
    });
    
  }

  SendMessage(){
    if (this.txtMessage) {  
      this.message = new Message();  
      this.message.SenderId = this.user.Id;  
      this.message.ChannelId=this.activeChannel.Id;
      this.message.Content = this.txtMessage;  
      console.log(this.message);
      this.activeChannel.Messages.push(this.message);  
      this.chatService.sendMessage(this.message);  
      this.txtMessage = '';  
  }
}
}
