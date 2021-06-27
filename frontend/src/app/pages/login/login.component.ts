import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { AuthCodes, AuthService } from "../../services/auth.service"
import { FormBuilder, Validators } from "@angular/forms"
import { NbToastrService } from "@nebular/theme"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private toast: NbToastrService) {}

  public showPassword = false;

  public getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  public logInWithGoogle() {
    this.auth.signInOauth()
  }

  public toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
  })

  public valid: false|undefined = undefined

  public logIn() {
    const username = this.loginForm.get("username")!.value
    const password = this.loginForm.get("password")!.value
    this.auth.attempt(username, password).then(attempt => {
      if (attempt == AuthCodes.success) {
        this.toast.success("Successfully Authenticated!")
        this.router.navigate(["/dashboard"])

      } else {
        this.toast.warning("The username or password is incorrect.")
      }
    })

  }

  public currentUser? = this.auth.currentUser.value

  ngOnInit(): void {
    if(this.currentUser) {
      this.router.navigate(["/dashboard"])
    }
  }

}
