<script setup lang="ts">
import { ref } from "vue";
import { store } from "../store";

const region = ref("eu");
const usernameWithTag = ref("Nanjo#2707");
const errorMsg = ref("");
const loading = ref(false);

function handleSubmit() {
	loading.value = true;
	const [username, tag] = usernameWithTag.value.split("#");

	fetch(
		`https://api.henrikdev.xyz/valorant/v3/matches/${region.value}/${username}/${tag}`
	)
		.then(async (res) => {
			loading.value = false;
			if (res.status === 200) {
				errorMsg.value = "";
				try {
					const data = await res.json();
					if (data.status === 200) {
						store.matchHistory = data.data;
						store.userSearched = true;
						store.searchedUser = [username, tag];
					} else {
						throw Error();
					}
				} catch {
					throw Error(
						"Failed to fetch match history with given region and username"
					);
				}
			} else {
				throw Error(
					"Failed to fetch match history with given region and username"
				);
			}
		})
		.catch((err) => {
			errorMsg.value = err.message;
		});
}
</script>

<template>
	<div v-if="loading" class="loader"></div>
	<div :class="store.userSearched ? '' : 'bigmargin'">
		<h1 v-if="!store.userSearched">VALORANT Match History Lookup</h1>
		<form @submit.prevent="handleSubmit">
			<div class="custom-select">
				<select name="region" v-model="region">
					<option selected value="eu">Europe</option>
					<option value="na">North America</option>
					<option value="kr">Korea</option>
					<option value="ap">Asia Pacific</option>
				</select>
				<span class="custom-arrow"></span>
			</div>
			<input
				type="text"
				placeholder="Username#tag"
				v-model="usernameWithTag"
				autofocus
			/>
		</form>
		<div v-if="errorMsg" class="error">{{ errorMsg }}</div>
	</div>
</template>

<style scoped lang="scss">
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.bigmargin {
	margin-top: 30%;
}

h1 {
	margin: 2em auto;
	font-size: 2rem;
	text-align: center;
}

.loader {
	display: block;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border: 16px solid transparent;
	border-top: 16px solid #EF5350;
	border-radius: 50%;
	width: 120px;
	height: 120px;
	animation: spin 1.5s linear infinite;
}

form {
	display: flex;
	margin: 0 auto;
	width: 100%;
}

input {
	background-color: #232323;
	border: 1px solid #767676;
	border-bottom-right-radius: 12px;
	border-top-right-radius: 12px;
	width: 100%;
	height: max-content;
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
	text-align: center;
}

@media screen and (min-width: 600px) {
	form {
		width: 80%;
		font-size: 1.125rem;
	}
}

@media screen and (min-width: 800px) {
	form {
		width: 60%;
		font-size: 1.25rem;
	}
}
</style>
