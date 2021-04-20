<svelte:head>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</svelte:head>
<Router>
	<Navbar />
	<br>
	<div>
		<Route path="/">
			<Home />
		</Route>
		<Route path="/about">
			<AboutUs />
		</Route>
		<Route path="/search">
			<Search />
		</Route>
		<Route path="/login">
			<Login />
		</Route>
		<Route path="/register">
			<Register />
		</Route>
	</div>
</Router>



<script lang="ts">
	import Home from "./pages/Home.svelte";
	import AboutUs from "./pages/AboutUs.svelte";
	import Search from "./pages/Search.svelte";
	import Login from "./pages/Login.svelte";
	import Register from "./pages/Register.svelte";

	import Navbar from "./components/Navbar.svelte";
	import { Router, Route, Link } from "svelte-navigator";
</script>
