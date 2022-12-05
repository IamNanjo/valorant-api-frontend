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
footer {
	display: flex;
	background: #202020;
	width: 100vw;
	height: 5em;
	margin-top: 5em;
	bottom: 0;
	left: 0;
	align-items: center;
	align-content: center;

	> a {
		gap: 0.5em;
		padding: 0 4em;
		font-size: 1.25rem;

		img {
			vertical-align: middle;
		}
	}
}
</style>
