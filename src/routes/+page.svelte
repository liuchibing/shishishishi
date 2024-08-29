<script lang="ts">
	import GuaDisplay from '$lib/components/GuaDisplay.svelte';
	import Sticks from '$lib/components/Sticks.svelte';
	import { 开始卜筮 } from '$lib/stores/卜筮';

	let { sticks, count爻, count变, currentStep, 卦, nextStep, reset } = 开始卜筮();

	$: hintText = (() => {
		switch ($currentStep) {
			case '分二':
				return '从中间一排中任意点击一根蓍草，将蓍草分为两组。（所选蓍草会被分至右边。）';
			case '挂一':
				return '从中间一排中任意点击一根蓍草，将蓍草挂起。';
			case '揲四':
				return '请等待程序自动进行：将每堆以四根为一组堆放。';
			case '归奇':
				return '请等待程序自动进行：将余数和“挂一”的一根放至下方不再使用。' + ($count变 === 2 ? '然后记录当前场上组数，成为一爻。' : '');
			case '进行下一变':
				return ($count变 === 2 ? '已记录当前场上组数，成为一爻。' : '') + '请点击中间一排中任意蓍草，进行下一变。';
		}
	})();
</script>

<div class="lg:container lg:mx-auto m-2">
	<div class="flex">
		<div class="min-h-32">
			<div class="my-2">
				当前步骤：第{$count爻+1}爻 - 第{$count变 + 1}变 - {$currentStep}：{hintText}
			</div>
		
			<div class="my-2 flex justify-left">
				<button class="px-3 py-1 rounded-sm bg-cyan-200 hover:bg-cyan-100 active:bg-cyan-300" on:click={reset}>重置</button>
			</div>
		</div>
		<div class="ml-auto">
			<GuaDisplay 卦={$卦} />
		</div>
	</div>
	
	<Sticks sticks={$sticks} on:click={(e) => nextStep(e.detail)} />
</div>
