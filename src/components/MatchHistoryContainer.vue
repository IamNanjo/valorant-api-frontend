<script setup>
import { store } from "../store";
import MatchVue from "./Match.vue";
</script>

<template>
	<div v-if="store.matchHistory.length" class="container">
		<MatchVue
			v-for="match in store.matchHistory"
			:key="match.metadata.matchid"
			:match-data="match"
		/>
	</div>
</template>

<style scoped lang="scss">
.container {
	display: flex;
	width: 100%;
	margin-top: 3em;
	flex-direction: column;
	flex-wrap: nowrap;
	gap: 2em;
	border-radius: 5em;
}
</style>
