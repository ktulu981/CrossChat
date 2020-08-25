import { AddchatComponent } from './chat/addchat/addchat.component';
import { ChannelService } from './chat/channel.service';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './Register/Register.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { ProfileComponent } from './Profile/Profile.component';
import { LoginComponent } from './Login/Login.component';
import { ChatComponent } from './chat/chat.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './helpers/jwt.intercepter';
import { AuthGuard } from './guards/auth.guard';
@NgModule({
  declarations: [	
    AppComponent,
    NavMenuComponent,
    HomeComponent,
   
      ProfileComponent,
      LoginComponent,
      RegisterComponent,
      ChatComponent,
      AddchatComponent
   ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    ChannelService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent],
  entryComponents: [AddchatComponent]
})
export class AppModule { }
