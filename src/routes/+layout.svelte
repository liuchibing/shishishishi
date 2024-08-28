<script>
	import '../app.css';
</script>

<svelte:head>
	<title>蓍筮试式</title>
	<meta name="description" content="蓍草筮法测试程式" />
	<meta name="keywords" content="蓍草筮法,测试,程式" />
	<meta name="author" content="liuchibing" />
</svelte:head>

<header class="sticky flex w-full justify-center">
	<h1 class="m-4 text-center font-serif text-3xl font-bold">蓍筮试式</h1>
</header>

<slot></slot>

<footer>
	<p class="m-4 text-center text-sm font-bold">© 2024 liuchibing</p>
	<p class="m-4 text-center text-sm">
		参考资料：<a
			class="text-emerald-600 underline hover:text-emerald-500 active:text-emerald-800"
			href="https://www.bilibili.com/read/cv34316494/"
			target="_blank"
		>
			https://www.bilibili.com/read/cv34316494/
		</a>
	</p>
</footer>
