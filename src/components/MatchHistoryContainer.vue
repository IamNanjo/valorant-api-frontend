<script setup>
import { store } from "../store";
import MatchVue from "./Match.vue";
</script>

<template>
	<MatchVue
		v-for="match in store.matchHistory"
		:key="match.metadata.matchid"
		:match-data="match"
	/>
</template>

<style scoped lang="scss"></style>
