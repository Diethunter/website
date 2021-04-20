<nav class="navbar navbar-expand-lg navbar-light bg-light">
	<Link class="navbar-brand" to="/">Diet Hunter</Link>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
	 aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>

	<div class="collapse navbar-collapse" id="navbarSupportedContent">
		<ul class="navbar-nav mr-auto">
			<li class="nav-item">
				<Link class="nav-link" to="/">Home</Link>
			</li>
			<li class="nav-item">
				<Link class="nav-link" to="/search">Search Recipes</Link>
			</li>
			{#if !loggedIn}
			<li class="nav-item">
				<Link class="nav-link" to="/login">Login</Link>
			</li>
			<li class="nav-item">
				<Link class="nav-link" to="/register">Register</Link>
			</li>
			{/if}
			<li class="nav-item">
				<Link class="nav-link" to="/about">About Us</Link>
			</li>
		</ul>
	</div>
</nav>

<script lang="ts">
import { Link } from "svelte-navigator";
import { backend } from "../api/Backend"
import { authToken } from "../api/store"

let loggedIn: boolean

authToken.subscribe(() => {
	loggedIn = backend.loggedIn()
})
</script>
