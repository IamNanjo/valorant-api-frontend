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
		<div
			class="player-details__username"
			:title="`${player.name}#${player.tag}`"
			@click="
				() => {
					store.searchedUser = `${player.name}#${player.tag}`;
				}
			"
		>
			<span class="player-details__name">{{ player.name }}</span>
			<span class="player-details__tag">#{{ player.tag }}</span>
		</div>
		<div class="player-details__score">
			{{ player.stats.kills }}/{{ player.stats.deaths }}/{{
				player.stats.assists
			}}
			({{
				Math.floor(
					((player.stats.kills + player.stats.assists / 3) /
						player.stats.deaths) *
						10
				) / 10
			}})
		</div>
	</div>
</template>

<style scoped lang="scss">
img {
	filter: drop-shadow(1px 1px 2px black);
}

.player-details {
	text-shadow: 1px 1px 6px black;

	&__username {
		max-width: 13ch;
		overflow-x: hidden;
		text-wrap: nowrap;
		text-overflow: ellipsis;
		cursor: pointer;
	}

	&__name,
	&__tag {
		display: contents;
	}

	&__score {
		user-select: none;
	}

	> :first-child {
		font-weight: 500;

		> :last-child {
			color: #aaaaaa;
		}
	}
}

@media screen and (min-width: 400px) {
	.player-details__username {
		max-width: 32ch;
	}
}
</style>
