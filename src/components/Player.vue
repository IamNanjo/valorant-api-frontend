<script setup lang="ts">
import { Player } from "../types";
import { store } from "../store";
const { player } = defineProps<{ player: Player }>();

const rankIcon = store.rankIcons[player.currenttier_patched.toUpperCase()];
</script>

<template>
	<img :src="rankIcon || store.rankIcons['UNRANKED']" height="48" />
	<img :src="player.assets.agent.small" :alt="player.character" height="48" />
	<div class="player-details">
		<div>
			<span>{{ player.name }}</span
			><span>#{{ player.tag }}</span>
		</div>
		<div>
			{{ player.stats.kills }}/{{ player.stats.deaths }}/{{
				player.stats.assists
			}}
		</div>
	</div>
</template>

<style scoped lang="scss">
.player-details {
	display: inline-block;

	> :first-child {
		font-weight: 500;

		text-overflow: ellipsis;
		word-wrap: nowrap;

		> :last-child {
			color: #aaaaaa;
		}
	}
	> div {
		text-align: center;
	}
}
</style>
