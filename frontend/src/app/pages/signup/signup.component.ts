import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { AuthCodes, AuthService } from "../../services/auth.service"
import { FormBuilder, Validators } from "@angular/forms"
import { NbToastrService } from "@nebular/theme"

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
    private toast: NbToastrService
  ) { }

  private isLoggedIn?: boolean

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
    let attempt = this.auth.signUp(username, name, password)
    if(attempt == AuthCodes.success) {
      this.toast.success("Successfully Registered!")
      return this.router.navigate(["/"])
    } else if(attempt == AuthCodes.usernameTaken) {
      this.toast.danger("Username taken")
    }
    return
  }

  ngOnInit(): void {
    this.auth.isLoggedIn.subscribe(_ => this.isLoggedIn = _)
    if(this.isLoggedIn) {
      this.router.navigate(["/"])
    }
  }

}
