<script context="module" lang="ts">
	export type StickData = {
		id: number;
	};
	export type SticksData = {
		left: StickData[][];
		right: StickData[][];
		hanging: StickData[][];
		removed: StickData[][];
		none: StickData[][];
	};
</script>

<script lang="ts">
	import { crossfade, fade, fly, slide } from 'svelte/transition';
	import Stick from './Stick.svelte';
	import { flip } from 'svelte/animate';
	import { createEventDispatcher } from 'svelte';

	// props
	export let sticks: SticksData;

	// dispatch click event
	const dispatch = createEventDispatcher<{
		click: number;
	}>();

	// interpret sticks data

	function flattenGroup(group: StickData[][], position: keyof SticksData) {
		return group.flatMap((subgroup, subgroupIndex) =>
			subgroup.map((stick, stickIndex) => {
				return {
					...stick,
					position: position,
					firstOfGroup: subgroupIndex === 0 && stickIndex === 0,
					lastOfGroup: subgroupIndex === group.length - 1 && stickIndex === subgroup.length - 1,
					lastOfSubgroup: stickIndex === subgroup.length - 1
				};
			})
		);
	}

	$: none = flattenGroup(sticks.none, 'none');

	$: left = flattenGroup(sticks.left, 'left');

	$: right = flattenGroup(sticks.right, 'right');

	$: middleLayer = [...left, ...none, ...right];

	$: hanging = flattenGroup(sticks.hanging, 'hanging');

	$: removed = flattenGroup(sticks.removed, 'removed');

	// crossfade transition
	const [send, receive] = crossfade({
		duration: 600,
		fallback(node, params) {
			return slide(node, {
				duration: 600
			});
		}
	});
</script>

<div class="flex flex-col">
	<div class="mb-1 flex justify-center bg-cyan-100 p-4">
		{#each hanging as stick (stick.id)}
			<button
				in:receive={{ key: stick.id }}
				out:send={{ key: stick.id }}
				animate:flip={{ duration: 600 }}
				class:mr-[0.8vw]={!stick.lastOfSubgroup && !stick.lastOfGroup}
				class:lg:mr-2={!stick.lastOfSubgroup && !stick.lastOfGroup}
				class:mr-[1.6vw]={stick.lastOfSubgroup && !stick.lastOfGroup}
				class:lg:mr-4={stick.lastOfSubgroup && !stick.lastOfGroup}
			>
				<Stick />
			</button>
		{/each}
	</div>
	<div class="my-1 flex justify-center bg-emerald-100 p-4">
		{#each middleLayer as stick (stick.id)}
			<button
				in:receive={{ key: stick.id }}
				out:send={{ key: stick.id }}
				animate:flip={{ duration: 600 }}
				on:click={() => dispatch('click', stick.id)}
				class:ml-auto={stick.position !== 'left' && stick.firstOfGroup}
				class:mr-[0.8vw]={!stick.lastOfSubgroup && !stick.lastOfGroup}
				class:lg:mr-2={!stick.lastOfSubgroup && !stick.lastOfGroup}
				class:mr-[1.6vw]={stick.lastOfSubgroup && !stick.lastOfGroup}
				class:lg:mr-4={stick.lastOfSubgroup && !stick.lastOfGroup}
				class:mr-auto={stick.position !== 'right' && stick.lastOfSubgroup && stick.lastOfGroup}
			>
				<Stick />
			</button>
		{/each}
	</div>
	<div class="my-1 flex justify-center bg-teal-100 p-4">
		{#each removed as stick (stick.id)}
			<button
				in:receive={{ key: stick.id }}
				out:send={{ key: stick.id }}
				animate:flip={{ duration: 600 }}
				class:mr-[0.8vw]={!stick.lastOfSubgroup && !stick.lastOfGroup}
				class:lg:mr-2={!stick.lastOfSubgroup && !stick.lastOfGroup}
				class:mr-[1.6vw]={stick.lastOfSubgroup && !stick.lastOfGroup}
				class:lg:mr-4={stick.lastOfSubgroup && !stick.lastOfGroup}
			>
				<Stick />
			</button>
		{/each}
	</div>
</div>
