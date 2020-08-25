import { AuthService } from './../services/auth.service';
import { AddchatComponent } from './addchat/addchat.component';
import { ChannelService } from "./channel.service";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

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
  constructor(private channelService: ChannelService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private authservice: AuthService) {}

  ngOnInit() {
    this.loadChannels();
    this.user=this.authservice.currentUserValue;
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

  Join(channel){

    if(this.openChannels){

   
    const index: number = this.openChannels.findIndex(
      d => d.Id === channel.Id
  );

  if(index>-1){
    return;
  }
  else{


    this.getChannelById(channel.Id);
  } }
  else{
    this.getChannelById(channel.Id);
  }
  }

  getChannelById(id){
   
    this.channelService.getChannel(id).subscribe(res=>{
  
      this.openChannels.push(res);
      this.activeChannel=res;
    });
    
  }

  SendMessage(){
        this.activeChannel.Messages.push({Content:this.txtMessage});
        this.txtMessage="";
  }
}
