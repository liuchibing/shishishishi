<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import 六十四卦 from '$lib/六十四卦.json';

	export let 卦: number[];

	function is阳(n: number): boolean {
		switch (n) {
			case 6:
				return false;
			case 7:
				return true;
			case 8:
				return false;
			case 9:
				return true;
			default:
				throw new Error('Invalid value'); // should never happen
		}
	}

	$: 卦in阴阳 = 卦.map((爻) => is阳(爻));

	function lookup卦Name(卦: boolean[]): string {
		if (卦.length === 3) {
			return (
				六十四卦.八卦.find((item) => item.pattern.every((it, index) => it === 卦[index]))?.name ||
				'未知'
			);
		} else if (卦.length === 6) {
			return (
				六十四卦.六十四卦.find((item) => item.pattern.every((it, index) => it === 卦[index]))
					?.name || '未知'
			);
		} else {
			return '';
		}
	}

	$: 卦Name = lookup卦Name(卦in阴阳);
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
				>
					{#if is阳(爻)}
						<rect x="0" y="0" width="100" height="10" fill="black" />
					{:else}
						<rect x="0" y="0" width="45" height="10" fill="black" />
						<rect x="55" y="0" width="45" height="10" fill="black" />
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
