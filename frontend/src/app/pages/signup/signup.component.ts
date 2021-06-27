import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { AuthCodes, AuthService } from "../../services/auth.service"
import { FormBuilder, Validators } from "@angular/forms"
import { NbToastrService } from "@nebular/theme"
import {Location} from "@angular/common";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  //Inject dependencies
  constructor(
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private toast: NbToastrService,
    private location: Location
  ) { }

  public logInWithGoogle() {
    this.auth.signInOauth()
  }

  public showPassword = false;

  public getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  public toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  //Variable holding the value of the confirm password field
  public confirmPassword?: string

  public passwordsMatch?: boolean

  public signupForm = this.fb.group({
    username: ['', Validators.required],
    name: ['', Validators.required],
    password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
  })

  public signUp() {
    const username = this.signupForm.get("username")!.value
    const name = this.signupForm.get("name")!.value
    const password = this.signupForm.get("password")!.value
    if(password !== this.confirmPassword) {
      return this.passwordsMatch = false
    }
    this.auth.signUp(username, name, password)
      .then(attempt => {
        if(attempt == AuthCodes.success) {
          this.toast.success("Successfully Registered!")
          this.router.navigate(["/dashboard"])
        } else {
          this.toast.warning("Username taken")
        }
      })
    return
  }

  public currentUser? = this.auth.currentUser.value

  ngOnInit(): void {
    if(this.currentUser) {
      this.location.back()
    }
  }

}
