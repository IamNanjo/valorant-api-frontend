<script setup lang="ts">
import SearchFieldVue from "./components/SearchField.vue";
import MatchHistoryContainerVue from "./components/MatchHistoryContainer.vue";
import { store } from "./store";
import { onBeforeMount, onMounted } from "vue";

interface MapData {
	displayName: string;
	listViewIcon: string;
	splash: string;
}

onBeforeMount(async () => {
	fetch("https://valorant-api.com/v1/maps").then(async (res) => {
		if (res.status === 200) {
			const data: MapData[] = (await res.json()).data;
			for (let i = 0; i < data.length; i++) {
				const map = data[i];
				store.mapIcons[map.displayName] = {
					normal: map.listViewIcon,
					large: map.splash
				};
			}
		}
	});

	fetch("https://valorant-api.com/v1/competitivetiers").then(async (res) => {
		if (res.status === 200) {
			const { tiers } = (await res.json()).data.at(-1);

			for (let i = 0; i < tiers.length; i++) {
				const rank = tiers[i];
				if (rank.smallIcon) {
					store.rankIcons[rank.tierName] = rank.smallIcon;
				}
			}
		}
	});
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
footer > a {
	display: flex;
	align-items: center;
	align-content: center;
	gap: 0.5em;
	background: #202020;
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100vw;
	height: 4em;
	padding: 0 4em;
	font-size: 1.25rem;
}
</style>
