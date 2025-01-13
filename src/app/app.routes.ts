import { RouterModule ,Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AgentRegComponent } from './agent-reg/agent-reg.component';
import { AdminComponent } from './admin/admin.component';
import { RegComponent } from './reg/reg.component';
import { Component, NgModule } from '@angular/core';
import { RajasthanComponent } from './places/rajasthan/rajasthan.component';
import { MaharashtraComponent } from './places/maharashtra/maharashtra.component';
import { UttarpradeshComponent } from './places/uttarpradesh/uttarpradesh.component';
import { KeralaComponent } from './places/kerala/kerala.component';
import { TamilnaduComponent } from './places/tamilnadu/tamilnadu.component';
import { KarnatakaComponent } from './places/karnataka/karnataka.component';
import { WestbengalComponent } from './places/westbengal/westbengal.component';
import { GujaratComponent } from './places/gujarat/gujarat.component';
import { PunjabComponent } from './places/punjab/punjab.component';
import { TelanganaComponent } from './places/telangana/telangana.component';
import { OdishaComponent } from './places/odisha/odisha.component';
import { AndhraPradeshComponent } from './places/andhra-pradesh/andhra-pradesh.component';
import { DelhiComponent } from './places/delhi/delhi.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { AuthService } from './auth.service';
import { BookingsComponent } from './bookings/bookings.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path:'home',component:HomeComponent},
    {path:'accommodation',component:AccommodationComponent},
    {path:'gallery',component:GalleryComponent},
    {path:'feedback',component:FeedbackComponent},
    {path:'agent-reg',component:AgentRegComponent},
    {path:'admin',component:AdminComponent},
    {path:'reg',component:RegComponent},
    {path:'rajasthan',component:RajasthanComponent},
    {path:'maharashtra',component:MaharashtraComponent},
    {path:'kerala',component:KeralaComponent},
    {path:'uttarpradesh',component:UttarpradeshComponent},
    {path:'tamilnadu',component:TamilnaduComponent},
    {path:'karnataka',component:KarnatakaComponent},
    {path:'westbengal',component:WestbengalComponent},
    {path:'gujarat',component:GujaratComponent},
    {path:'punjab',component:PunjabComponent},
    {path:'telangana',component:TelanganaComponent},
    {path:'odisha',component:OdishaComponent},
    {path:'andhrapradesh',component:AndhraPradeshComponent},
    {path:'delhi',component:DelhiComponent},
    { path: 'reset-password/:token', component: ResetPasswordComponent },
    { path: 'forgotpassword', component: ForgotPasswordComponent },
   { path: 'admin-dashboard', component: AdminDashboardComponent },
   {path:'profile',component:ProfileComponent},
   {path:'bookings',component:BookingsComponent}
  
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthService]
  })
  export class AppRoutingModule {}