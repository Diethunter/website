export class Backend {
  public static url = "";

  public static authToken = null;

  public static loggedIn() {
    if (this.authToken) {
      return true;
    } else if (localStorage.getItem("authToken")) {
      return true;
    } else {
      return false;
    }
  }
}
