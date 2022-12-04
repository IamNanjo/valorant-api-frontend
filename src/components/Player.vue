<script setup lang="ts">
import { Player } from "../types";
import { store } from "../store";
const { player } = defineProps<{ player: Player }>();

const rankIcon = store.rankIcons[ player.currenttier_patched.toUpperCase() ];
</script>

<template>
	<img :src="(rankIcon || store.rankIcons['UNRANKED'])" height="48" />
	<img :src="player.assets.agent.small" :alt="player.character" height="48" />
	<span>{{ player.name }}#{{ player.tag }}</span>
</template>

<style scoped lang="scss"></style>
