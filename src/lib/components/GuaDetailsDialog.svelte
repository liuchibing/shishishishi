<script lang="ts">
	import { slide } from 'svelte/transition';
	import GuaDisplay from './GuaDisplay.svelte';

	// dialog stuffs

	export let open = false;

	let dialog: HTMLDialogElement | undefined;

	$: if (open) dialog?.showModal();
	else dialog?.close();

	// gua stuffs
	export let 卦: number[];

	function 变(卦: number[]): number[] {
		return 卦.map((爻) => {
			switch (爻) {
				case 6:
					return 9;
				case 9:
					return 6;
				default:
					return 爻;
			}
		});
	}
</script>

<dialog
	bind:this={dialog}
	on:close={() => (open = false)}
	class="w-full lg:w-2/3 rounded-md border border-gray-300 bg-white p-4 shadow-lg"
>
	<button on:click={() => dialog?.close()} class="absolute right-4 top-4">✕</button>

	<div class="mt-6 flex justify-evenly">
		<div>
			<h3>本卦</h3>
			<GuaDisplay {卦} highlight动爻 />
		</div>
		<div>
			<h3>变卦</h3>
			<GuaDisplay 卦={变(卦)} highlight动爻 />
		</div>
	</div>
    <p class="m-4 text-center text-sm">
		参考资料：<a
			class="text-emerald-600 underline hover:text-emerald-500 active:text-emerald-800"
			href="https://zhuanlan.zhihu.com/p/23373538"
			target="_blank"
		>
        https://zhuanlan.zhihu.com/p/23373538
		</a>
        <a
			class="text-emerald-600 underline hover:text-emerald-500 active:text-emerald-800"
			href="https://ctext.org/book-of-changes/zhs"
			target="_blank"
		>
        https://ctext.org/book-of-changes/zhs
		</a>
        <a
			class="text-emerald-600 underline hover:text-emerald-500 active:text-emerald-800"
			href="https://www.qihuang.vip/guoxue-8.html"
			target="_blank"
		>
        https://www.qihuang.vip/guoxue-8.html
		</a>
	</p>
</dialog>
