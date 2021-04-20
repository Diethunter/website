<form on:submit|preventDefault={submit}>
	<label>Recipe Name<span style="color:red;">*</span></label><br>
	<span style="color:red;">{errors.name || ""}</span>
	<input class="form-control d-inline-flex p" placeholder="Recipe Name" bind:value={recipe_name}><br>
	<label>Calories</label><br>
	<div class="d-flex flex-row">
		<input type="number" class="form-control p-2" placeholder="Max calories" bind:value={max_cals}>
		-
		<input type="number" class="form-control p-2" placeholder="Min calories" bind:value={max_cals}>
		<span>cals</span>
	</div>
	<label>Fat</label><br>
	<div class="d-flex flex-row">
		<input type="number" class="form-control p-2" placeholder="Max fat" bind:value={max_fat}>
		-
		<input type="number" class="form-control p-2" placeholder="Min fat" bind:value={min_fat}>
		g
	</div>
	<label>Carbohydrates</label><br>
	<div class="d-flex flex-row">
		<input type="number" class="form-control p-2" placeholder="Max carbs" bind:value={max_carbs}>
		-
		<input type="number" class="form-control p-2" placeholder="Min carbs" bind:value={min_carbs}>
		g
	</div>
	<label>Protein</label><br>
	<div class="d-flex flex-row">
		<input type="number" class="form-control p-2" placeholder="Max protein" bind:value={max_protein}>
		-
		<input type="number" class="form-control p-2" placeholder="Min protein" bind:value={min_protein}>
		g
	</div>
	<hr>
	<button class="btn btn-primary" type="submit">Search</button>
</form>
<script lang="ts">
  let recipe_name;

  let max_cals;
  let min_cals;

  let max_fat;
  let min_fat;

  let max_protein;
  let min_protein;

  let max_carbs;
  let min_carbs;

  let errors = {};

  function submit() {
    if (!recipe_name) {
      errors.name = "A recipe must have a name.";
      return;
    }
  }
</script>