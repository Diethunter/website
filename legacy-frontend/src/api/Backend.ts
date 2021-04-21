import { authToken } from "./store"

class Backend {

	constructor() {
		authToken.subscribe((val: string) => {
			this.authToken = val
		})
	}

  public url = "";

	public authToken = null;

  public loggedIn() {
    if (this.authToken) {
      return true;
    } else if (localStorage.getItem("authToken")) {
			authToken.set(localStorage.getItem("authToken"))
      return true;
    } else {
      return false;
    }
	}

	public register(username: string, password: string): void {
		alert("Registered user "+username)
		authToken.set("123")
	}

	public login(username: string, password: string): void {
		alert("Logged in user "+username)
		authToken.set("123")
	}
}

export const backend = new Backend()
