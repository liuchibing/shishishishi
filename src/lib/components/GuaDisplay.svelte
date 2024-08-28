<script lang="ts">
	import { flip } from "svelte/animate";
	import { fade } from "svelte/transition";

    export let 卦: number[];

    function toYinYang(n: number): '-' | '--' {
        switch(n) {
            case 6:
                return '--';
            case 7:
                return '-';
            case 8:
                return '--';
            case 9:
                return '-';
            default: 
                throw new Error('Invalid value'); // should never happen
        }
    }
</script>

<div class="my-2 flex items-center">
    <div class="flex flex-col-reverse">
        {#each 卦 as 爻, index (index)}
            <svg viewBox="0 0 100 10" class="h-2 my-1 first:mb-0 last:mt-0" transition:fade={{ duration: 600 }} animate:flip={{ duration: 600 }}>
                {#if toYinYang(爻) === '-' }
                    <rect x="0" y="0" width="100" height="10" fill="black" />
                {:else}
                    <rect x="0" y="0" width="45" height="10" fill="black" />
                    <rect x="55" y="0" width="45" height="10" fill="black" />
                {/if}
            </svg>
        {/each}
    </div>
    <div class="flex flex-col-reverse ml-2">
        {#each 卦 as 爻, index (index)}
            <div class="text-xs" transition:fade={{ duration: 600 }} animate:flip={{ duration: 600 }}>
                {爻}
            </div>
        {/each}
    </div>
</div>