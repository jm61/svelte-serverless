<script>
	let data = []
	const url = 'https://serverless-basic-api.netlify.app/api/2-basic-api'
	const myInit = { method: 'GET', mode: 'cors'}
	const fetchData = async () => {
		const res = await fetch(url, myInit)
		data = await res.json()
	}
</script>

<main>
	<h1 on:click={fetchData}>Hello!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	{#each data as item }
		<p>{item.name}</p>
		<img src={item.image.url} alt="img">
	{/each}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	p{
		border: 1px solid slateblue;
		margin-top: 1rem;
		padding: .5rem;
		background-color: khaki;
		color: darkolivegreen;
		border-radius: .5rem 0;
	}
	img {
		width: 30%;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>