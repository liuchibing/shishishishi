<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import { is阳, lookup卦Name, to卦in阴阳 } from '$lib/utils';

	export let 卦: number[];
	export let highlight动爻: boolean = false;

	$: 卦Name = lookup卦Name(to卦in阴阳(卦));

	function is动爻(爻: number): boolean {
		return 爻 === 6 || 爻 === 9;
	}
</script>

<div class="my-2 flex flex-col">
	<div class="flex items-center">
		<div class="flex flex-col-reverse">
			{#each 卦 as 爻, index (index)}
				<svg
					viewBox="0 0 100 10"
					class="my-1 h-2 first:mb-0 last:mt-0"
					transition:fade={{ duration: 600 }}
					animate:flip={{ duration: 600 }}
					class:fill-black={!highlight动爻 || !is动爻(爻)}
					class:fill-red-600={highlight动爻 && is动爻(爻)}
				>
					{#if is阳(爻)}
						<rect x="0" y="0" width="100" height="10" />
					{:else}
						<rect x="0" y="0" width="45" height="10" />
						<rect x="55" y="0" width="45" height="10" />
					{/if}
				</svg>
			{/each}
		</div>
		<div class="ml-2 flex flex-col-reverse">
			{#each 卦 as 爻, index (index)}
				<div class="text-xs" transition:fade={{ duration: 600 }} animate:flip={{ duration: 600 }}>
					{爻}
				</div>
			{/each}
		</div>
	</div>
	<div>{卦Name}</div>
</div>
