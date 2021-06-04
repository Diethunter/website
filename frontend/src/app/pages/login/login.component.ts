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

  private isLoggedIn?: boolean

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
  })

  public valid: false|undefined = undefined

  public logIn() {
    const username = this.loginForm.get("username")!.value
    const password = this.loginForm.get("password")!.value
    let attempt = this.auth.attempt(username, password)
    if(attempt == AuthCodes.success) {
      this.toast.success("Successfully Authenticated!")
      this.router.navigate(["/dashboard"])

    } else if(attempt == AuthCodes.userDoesNotExist) {
      this.toast.danger("That user does not exist")

    } else if(attempt == AuthCodes.incorrectPassword) {
      this.toast.danger("Incorrect password")
    }
  }

  ngOnInit(): void {
    this.auth.isLoggedIn.subscribe(_ => this.isLoggedIn = _)
    if(this.isLoggedIn) {
      this.router.navigate(["/dasnboard"])
    }
  }

}
