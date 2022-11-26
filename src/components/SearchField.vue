<script setup>
import { ref } from "vue";
import { store } from "../store";

const region = ref("eu");
const usernameWithTag = ref("");
const errorMsg = ref("");

function handleSubmit() {
	const [username, tag] = usernameWithTag.value.split("#");

	fetch(`https://api.henrikdev.xyz/valorant/v3/matches/${region.value}/${username}/${tag || "tag"}`)
		.then(async (res) => {
			if (res.status === 200) {
				errorMsg.value = "";
				try {
					const data = await res.json();
					store.matchHistory = data.data;
					store.userSearched = true;
				} catch {
					throw Error("Failed to fetch match history with given username")
				}
			} else {
				throw Error("Failed to fetch match history with given username");
			}
		})
		.catch((err) => {
			errorMsg.value = err.message;
		});
}
</script>

<template>
	<form
		:class="store.userSearched ? '' : 'bigmargin'"
		@submit.prevent="handleSubmit"
	>
		<div class="custom-select">
			<select name="region" v-model="region">
				<option selected value="eu">Europe</option>
				<option value="na">North America</option>
				<option value="kr">Korea</option>
				<option value="ap">Asia Pacific</option>
			</select>
			<span class="custom-arrow"></span>
		</div>
		<input type="text" placeholder="Username#tag" v-model="usernameWithTag" />
	</form>
	<div v-if="errorMsg" class="error">{{ errorMsg }}</div>
</template>

<style scoped lang="scss">
.bigmargin {
	margin-top: 40%;
}

form {
	display: flex;
}

input {
	background-color: #232323;
	border: 1px solid #767676;
	border-bottom-right-radius: 12px;
	border-top-right-radius: 12px;
	width: 100%;
	height: max-content;
	font-size: 1.5rem;
	padding: 1em;
	box-shadow: none;
}

.custom-select {
	position: relative;

	select {
		background-color: #232323;
		height: 100%;
		border: 1px solid #767676;
		border-bottom-left-radius: 12px;
		border-top-left-radius: 12px;
		font-size: 1.5rem;
		padding: 1em 4em 1em 1em;
		appearance: none;
	}

	.custom-arrow {
		position: absolute;
		background-color: transparent;
		top: 0;
		right: 0;
		width: 4em;
		height: 100%;
		pointer-events: none;

		&::before,
		&::after {
			--size: 0.5em;
			--color: white;

			content: "";
			position: absolute;
			width: 0;
			height: 0;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		&::before {
			border-left: var(--size) solid transparent;
			border-right: var(--size) solid transparent;
			border-bottom: var(--size) solid var(--color);

			top: 40%;
		}

		&::after {
			border-left: var(--size) solid transparent;
			border-right: var(--size) solid transparent;
			border-top: var(--size) solid var(--color);

			top: 60%;
		}
	}
}

.error {
	width: 100%;
	padding: 0.5em;
	color: #ef5350;
	font-size: 2rem;
	font-weight: 700;
}
</style>
