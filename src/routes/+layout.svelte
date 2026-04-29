<script lang="ts">
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import "@glidejs/glide/dist/css/glide.core.min.css";
	import '$lib/assets/css/all.css';
    import Header from '$lib/assets/components/sections/Header.svelte';
    import Footer from '$lib/assets/components/sections/Footer.svelte';
	import { localizeUrl } from '$lib/paraglide/runtime';

	let { children } = $props();

	const BASE = 'https://swiss-worx.ch';
	let pathname = $derived(page.url.pathname);
	let deUrl = $derived(localizeUrl(BASE + pathname, {locale: 'de'}).toString());
	let enUrl = $derived(localizeUrl(BASE + pathname, {locale: 'en'}).toString());
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="canonical" href={BASE + pathname} />
	<link rel="alternate" hreflang="de"        href={deUrl} />
  	<link rel="alternate" hreflang="en"        href={enUrl} />
  	<link rel="alternate" hreflang="x-default" href={deUrl} />
	
	<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-EJTQ9WE5HT"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'G-EJTQ9WE5HT');
	</script>

	<script type="text/javascript">
		(function(c,l,a,r,i,t,y){
			c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
			t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
			y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
		})(window, document, "clarity", "script", "vr04b2sm8j");
	</script>
	
	<!-- Google Tag Manager -->
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-K7SZRW7T');</script>
	<!-- End Google Tag Manager -->
	<!-- Google Tag Manager (noscript) -->
	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K7SZRW7T"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<!-- End Google Tag Manager (noscript) -->
</svelte:head>

<div class="body-content">
	<Header cities={page.data.cities} />
	{@render children()}
</div>
<Footer cities={page.data.cities} />
