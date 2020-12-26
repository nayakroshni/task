import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model' 
import { MaritalModel } from '../marital.model'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Router } from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userservice:UserService,private router:Router) { }


  users = []
  ngOnInit(): void {
  this.userservice.getUserList().subscribe(data =>{  
    this.users = data;   
    })
    console.log(this.users)  
  }

  user:User = new User()
  maritalstatus:MaritalModel = new MaritalModel()
  id = 0
  fname = ""
  mname = ""
  sname = ""
  marital = 0

  saveData()
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

  	this.userservice.createUser(this.user)  
      .subscribe(  
        data => {  
          alert("Record Inserted Successfully !!")  
            
          this.userservice.getUserList().subscribe(data =>{  
            this.users =data  
            })  
        },  
        error => console.log(error));
   
    this.user = new User();
    

  }


  deleteUser(id:number)
  {
  	this.userservice.deleteUser(id)  
      .subscribe(  
        data => {  
          alert("Record Deleted Successfully !!")  
            
          this.userservice.getUserList().subscribe(data =>{  
            this.users =data  
            })  
        },  
        error => console.log(error));
  }

  updateUser(id:number)
  {
  	this.router.navigate(['update',id])
  }

}
