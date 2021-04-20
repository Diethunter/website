<form on:submit|preventDefault={submit}>
	<label>Username</label>
	<br />
	<span style="color:red;">{errors.username || ""}</span>
	<input type="username" class="form-control" placeholder="Username" bind:value={username}>
	<br />
	<label>Password</label>
	<br />
	<span style="color:red;">{errors.password || ""}</span>
	<input type="password" class="form-control" placeholder="Password" bind:value={password}>
	<hr />
	<button type="submit" class="btn btn-primary">Log in</button>
</form>

<script lang="ts">
import { backend } from "../api/Backend"

  let username;
  let password;
  let errors = {};

  function submit() {
    !password
      ? (errors.password = "Password must not be empty.")
      : password.length < 8
      ? (errors.password = "Passwords must be at least 8 characters.")
      : (errors.password = "");
    !username
      ? (errors.username = "Username must not be empty.")
			: (errors.username = "");
		if(!errors) {
			backend.login(username, password)
			return
		} else {
			return
		}
  }
</script>
