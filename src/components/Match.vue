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
			console.log("player.team :>> ", player.team);
			if (player.team === "Blue") {
				playerInBlueTeam.value = true;
			}
		}
	}

	return (playerInBlueTeam.value && matchData.teams.blue.has_won) ||
		(!playerInBlueTeam.value && matchData.teams.red.has_won)
		? "Victory"
		: "Defeat";
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
		:style="`background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${mapIcon!.large});`"
	>
		<div class="game-result">
			<div>{{ checkWin() }}</div>
			<div v-if="playerInBlueTeam">
				{{ matchData.teams.blue.rounds_won }} -
				{{ matchData.teams.red.rounds_won }}
			</div>
			<div v-else>
				{{ matchData.teams.red.rounds_won }} -
				{{ matchData.teams.blue.rounds_won }}
			</div>
		</div>
		<div class="players">
			<div class="col">
				<div v-for="player in matchData.players.blue" class="player">
					<PlayerVue :player="player" />
				</div>
			</div>

			<div class="col">
				<div v-for="player in matchData.players.red" class="player">
					<PlayerVue :player="player" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.match {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	background-position: center;
	background-size: cover;
	width: 100%;
	padding: 2em;
	height: 22em;
	border-radius: 1em;
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: nowrap;
}

.game-result {
	display: flex;
	flex-direction: column;
	place-items: center;
	place-content: center;
	font-size: 2rem;
	font-weight: 500;
}

.players {
	display: flex;
	align-items: center;
	gap: 1em 2em;
	height: 100%;

	.col {
		display: flex;
		flex-direction: column;
		gap: 0.5em;

		.player {
			display: flex;
			place-items: center;
			gap: 0.25em;
		}
	}
}
</style>
