import { Component, OnInit } from '@angular/core';
import { User } from '../user.model' 
import { MaritalModel } from '../marital.model'
import { HttpClient, HttpParams } from '@angular/common/http'
import { ActivatedRoute,Router } from '@angular/router'

import { UserService } from '../user.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private route:ActivatedRoute,private userservice:UserService,private router:Router) { }

  id = 0
  fname = ""
  mname = ""
  sname = ""
  marital = ""
  user:User = new User()
  maritalstatus:MaritalModel = new MaritalModel()
  ngOnInit(): void {
  this.id  = parseInt(this.route.snapshot.paramMap.get('id'))
  
  this.userservice.getUser(this.id).subscribe(data =>{  
   this.fname = data.firstName
   this.mname = data.middleName
   this.sname = data.surName
   this.marital = data.maritalModel.maritalStatusID
   
    })
    
  }
  
  

  
  

  updateData()
  {
  this.user.userID = this.id
  	this.user.surName = this.sname
  	this.user.firstName = this.fname
  	this.user.middleName = this.mname
  	if(this.marital==1)
  	{
  		this.maritalstatus.maritalStatusID = 1
  		this.maritalstatus.maritalStatus = "Unmarried"
  	}
  	else if(this.marital==2)
  	{
  		this.maritalstatus.maritalStatusID = 2
  		this.maritalstatus.maritalStatus = "Married"
  	}
  	else if(this.marital==3)
  	{
  		this.maritalstatus.maritalStatusID = 3
  		this.maritalstatus.maritalStatus = "Devorced"
  	}
  	else
  	{
  		this.maritalstatus.maritalStatusID = 4
  		this.maritalstatus.maritalStatus = "Awaiting Devorce"
  	}
  	
  	this.user.maritalModel = this.maritalstatus

  	this.userservice.updateUser(this.id,this.user)  
      .subscribe(  
        data => {  
          alert("Record Update Successfully !!")  
            
          this.router.navigate(['register'])
        },  
        error => console.log(error));
   
    this.user = new User();

  }

}
