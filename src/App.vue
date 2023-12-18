<script setup lang="ts">
import { ofetch } from "ofetch";
import SearchFieldVue from "./components/SearchField.vue";
import MatchHistoryContainerVue from "./components/MatchHistoryContainer.vue";
import { store } from "./store";
import { onBeforeMount } from "vue";

interface MapData {
	data: { displayName: string; listViewIcon: string; splash: string }[];
}

interface RankData {
	data: {
		tiers: { tierName: string; smallIcon: string; largeIcon: string }[];
	}[];
}

onBeforeMount(async () => {
	ofetch("https://valorant-api.com/v1/maps").then((res: MapData) => {
		const maps = res.data;

		for (let i = 0, len = maps.length; i < len; i++) {
			const map = maps[i];
			store.mapIcons[map.displayName] = {
				normal: map.listViewIcon,
				large: map.splash
			};
		}
	});

	ofetch("https://valorant-api.com/v1/competitivetiers").then(
		(res: RankData) => {
			const { tiers } = res.data[res.data.length - 1];
			for (let i = 0, len = tiers.length; i < len; i++) {
				const rank = tiers[i];
				if (rank.smallIcon) {
					store.rankIcons[rank.tierName] = rank.smallIcon;
				}
			}
		}
	);
});
</script>

<template>
	<nav><SearchFieldVue /></nav>
	<main><MatchHistoryContainerVue /></main>
	<footer>
		<a href="https://github.com/IamNanjo/valorant-api-frontend" target="_blank">
			Source code on GitHub
			<img src="/github.png" alt="" height="32" />
		</a>
	</footer>
</template>

<style lang="scss">
*,
*::before,
*::after {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	font: inherit;
	text-decoration: none;
	color: rgba(255, 255, 255, 0.87);
	line-height: 1.5em;
}

:root {
	--bg-raise: rgba(255, 255, 255, 0.03);
	color-scheme: dark;
}

::-webkit-scrollbar {
	display: none;
}

body {
	position: relative;
	background-color: #121212;
	min-height: 100vh;
	min-height: 100svh;
	padding-top: 1em;
	font-family: Roboto, sans-serif;
}
nav,
main {
	width: 90%;
	max-width: 1280px;
	margin: 0 auto;
}
main {
	padding-bottom: 6em;
}

footer {
	display: flex;
	position: absolute;
	bottom: 0;
	background: rgba(255, 255, 255, 0.03);
	width: 100%;
	height: 4em;
	padding: 0 2em;
	align-items: center;
	align-content: center;

	> a {
		display: flex;
		align-items: center;
		font-size: 1.125em;

		img {
			height: 1.75em;
			margin-left: 0.5em;
		}
	}
}

code {
	font-family: "JetBrains Mono", monospace;
}

a:hover::after {
	content: "";
	display: block;
	position: absolute;
	bottom: 0;
	width: 0;
	height: 2px;
}

.no-select, button, img {
	user-select: none;
}

@media screen and (min-width: 960px) {
	nav,
	main {
		width: 75%;
	}
}
</style>
