<script setup lang="ts">
import { ref } from "vue";
import { Match } from "../types";
import PlayerVue from "./Player.vue";
import { store } from "../store";

const { matchData } = defineProps<{ matchData: Match }>();

const playerInBlueTeam = ref(false);
let mapIcon: { normal: string; large: string } | null =
	store.mapIcons[matchData.metadata.map];

function checkWin() {
	for (let i = 0; i < matchData.players.all_players.length; i++) {
		const player = matchData.players.all_players[i];
		const [name, tag] = store.searchedUser.split("#");

		if (player.name === name && player.tag === tag) {
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
</script>

<template>
	<div
		v-if="
			['Unrated', 'Competitive', 'Swiftplay'].includes(matchData.metadata.mode)
		"
		class="match"
		:style="`background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${mapIcon!.large}) center center / cover;`"
	>
		<div class="game-result">
			<div class="no-select">{{ matchData.metadata.mode }}</div>
			<div class="no-select" v-html="checkWin()"></div>
			<div class="no-select" v-if="playerInBlueTeam">
				{{ matchData.teams.blue.rounds_won }} -
				{{ matchData.teams.red.rounds_won }}
			</div>
			<div class="no-select" v-else>
				{{ matchData.teams.red.rounds_won }} -
				{{ matchData.teams.blue.rounds_won }}
			</div>
		</div>

		<div class="teams">
			<div class="team">
				<PlayerVue v-for="player in matchData.players.blue" :player="player" />
			</div>

			<div class="team">
				<PlayerVue v-for="player in matchData.players.red" :player="player" />
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.match {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 2em;
	width: 100%;
	padding: 1em;
	border-radius: 1em;
}

.game-result {
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
	margin-inline: auto;
	font-size: 1.5em;
	font-weight: 500;
	text-shadow: 1px 1px 6px black;
	text-align: center;

	> :first-child {
		color: #aaaaaa;
		font-size: 1.5rem;
	}
}

.teams {
	display: flex;
	flex-wrap: wrap;
	margin: auto;
	gap: 3em;
}

.team {
	display: grid;
	grid-template-columns: max-content max-content 1fr;
	width: max-content;
	gap: 0.5em;
	text-align: left;
}
</style>
