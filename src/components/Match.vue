<script setup>
const props = defineProps({
	matchData: {
		type: Object,
		required: true
	}
});
</script>

<template>
	<div>{{ match.metadata.matchid }}</div>
</template>

<style scoped lang="scss"></style>
