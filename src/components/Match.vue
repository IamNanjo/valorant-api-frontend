<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from "vue";
import { Match, Player } from "../types";
import PlayerVue from "./Player.vue";
import { store } from "../store";

const { matchData } = defineProps<{ matchData: Match }>();

const playerInBlueTeam = ref(false);
let mapIcon: { normal: string; large: string } | null;

function checkWin() {
	for (let i = 0; i < matchData.players.all_players.length; i++) {
		const player = matchData.players.all_players[i];

		if (
			player.name === store.searchedUser[0] &&
			player.tag === store.searchedUser[1]
		) {
			if (player.team === "Blue") {
				playerInBlueTeam.value = true;
			}
		}
	}

	return (playerInBlueTeam.value && matchData.teams.blue.has_won) ||
		(!playerInBlueTeam.value && matchData.teams.red.has_won)
		? "<div style='color: #66BB6A;'>Victory</div>"
		: "<div style='color: #EF5350;'>Defeat</div>";
}

onBeforeMount(() => {
	try {
		mapIcon = store.mapIcons[matchData.metadata.map];
	} catch {
		mapIcon = null;
	}
});
</script>

<template>
	<div
		v-if="
			'Unrated' === matchData.metadata.mode ||
			'Competitive' === matchData.metadata.mode
		"
		class="match"
		:style="`background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(${mapIcon!.large}) center center / cover;`"
	>
		<div class="game-result">
			<div>{{ matchData.metadata.mode }}</div>
			<div v-html="checkWin()"></div>
			<div v-if="playerInBlueTeam">
				{{ matchData.teams.blue.rounds_won }} -
				{{ matchData.teams.red.rounds_won }}
			</div>
			<div v-else>
				{{ matchData.teams.red.rounds_won }} -
				{{ matchData.teams.blue.rounds_won }}
			</div>
		</div>
		<div class="team">
			<PlayerVue v-for="player in matchData.players.blue" :player="player" />
		</div>

		<div class="team">
			<PlayerVue v-for="player in matchData.players.red" :player="player" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.match {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	width: 100%;
	padding: 3em;
	height: 22em;
	border-radius: 1em;
}

.game-result {
	display: flex;
	flex-direction: column;
	place-items: center;
	place-content: center;
	font-size: 2rem;
	font-weight: 500;

	> :first-child {
		color: #aaaaaa;
		font-size: 1.5rem;
	}
}

.team {
	display: grid;
	grid-template-columns: repeat(3, max-content);
	gap: 0.5em;
}
</style>
