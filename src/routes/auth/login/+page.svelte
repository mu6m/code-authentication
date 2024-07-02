<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	let loading = false;
	let alert: { msg: string; type: boolean }[] = [];
</script>

{#if alert.length > 0}
	{#each alert as a}
		<div role="alert" class="alert alert-info">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="h-6 w-6 shrink-0 stroke-current"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				></path>
			</svg>
			<span>{a.msg}</span>
		</div>
	{/each}
{/if}
<form
	class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-4 w-fit mx-auto"
	method="POST"
	action="?/login"
	use:enhance={({ formElement, formData, action, cancel, submitter }) => {
		return async ({ result, update }) => {
			if (result.status != 400) {
				alert.push({
					msg: 'you are logged in!',
					type: true
				});
			}
		};
	}}
>
	<label class="form-control w-full max-w-xs">
		<div class="label">
			<span class="label-text">your account id</span>
		</div>
		<input
			type="text"
			placeholder="Type here"
			class="input input-bordered w-full max-w-xs"
			name="id"
		/>
	</label>

	{#if loading}
		<button class="btn">
			<span class="loading loading-spinner"></span>
			loading
		</button>
	{:else}
		<button type="submit" class="btn btn-active btn-primary">login</button>
	{/if}
	<a
		class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
		href="/auth/register"
	>
		don't have an account?
	</a>
</form>
