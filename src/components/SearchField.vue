<script setup lang="ts">
import { onBeforeMount, onMounted, ref, toRef, watch } from "vue";
import { ofetch } from "ofetch";
import { store } from "../store";

type Region = "eu" | "na" | "kr" | "ap";

const region = ref<Region>("eu");
const errorMsg = ref("");
const loading = ref(false);

function handleSearch() {
	errorMsg.value = "";
	store.matchHistory = [];

	if (!store.searchedUser.includes("#") || !store.searchedUser.split("#")[1]) {
		errorMsg.value = "Username is missing the tag";
		return;
	}

	const [name, tag] = store.searchedUser.split("#");

	if (tag.length > 5) {
		errorMsg.value =
			"The tag is too long. It has a maximum length of 5 characters";
		return;
	}

	loading.value = true;

	ofetch(
		`https://api.henrikdev.xyz/valorant/v3/matches/${region.value}/${name}/${tag}`
	)
		.then((res) => {
			errorMsg.value = "";
			store.matchHistory = res.data;
			store.userSearched = true;
		})
		.catch((err) => {
			errorMsg.value = err.data.errors.map((o: any) => o.message).join(". ");
		})
		.finally(() => {
			loading.value = false;
		});
}

onBeforeMount(() => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search).entries()
	) as { region?: Region; name?: string; tag?: string };

	if ("region" in params && params.region) {
		region.value = params.region;
	}

	if ("name" in params && "tag" in params) {
		store.searchedUser = `${params.name}#${params.tag}`;
	}
});

onMounted(() => {
	if (store.searchedUser) {
		handleSearch();
	}

	watch(
		() => store.searchedUser,
		() => {
			const [name, tag] = store.searchedUser.split("#");

			const currentPath = window.location.pathname;
			const newSearch = `?region=${region.value}&name=${name}&tag=${tag}`;
			const newURL = currentPath + newSearch;

			window.history.pushState({ path: newURL }, "", newURL);
			handleSearch();
		}
	);
});
</script>

<template>
	<div v-if="loading" class="loader"></div>
	<div :class="store.userSearched ? '' : 'bigmargin'">
		<h1 v-if="!store.userSearched">VALORANT Match History Lookup</h1>
		<search>
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
				autofocus
				:value="store.searchedUser"
				@change="(e) => store.searchedUser = (e.target as HTMLInputElement).value"
			/>
		</search>
		<div v-if="errorMsg" class="error">{{ errorMsg }}</div>
	</div>
</template>

<style scoped lang="scss">
@-webkit-keyframes spin {
	0% {
		-webkit-transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
	}
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.bigmargin {
	margin-top: 20vh;
}

h1 {
	margin: 2em auto;
	font-size: 1.75em;
	text-align: center;
}

.loader {
	display: block;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border: 16px solid transparent;
	border-top: 16px solid #ef5350;
	border-radius: 50%;
	width: 120px;
	height: 120px;
	animation: spin 1.5s linear infinite;
}

search {
	display: flex;
	margin: 0 auto;
	width: 100%;
}

input {
	background-color: rgba(255, 255, 255, 0.03);
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
	font-size: var(--font-size);

	select {
		background-color: #232323;
		width: max-content;
		height: 100%;
		border: 1px solid #767676;
		border-bottom-left-radius: 12px;
		border-top-left-radius: 12px;
		padding: 0.75em 3em 0.75em 0.75em;
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
	padding: 1em;
	color: #ef5350;
	font-size: 1.75em;
	font-weight: 700;
	text-align: center;
}

@media screen and (min-width: 600px) {
	form {
		width: 80%;
	}
}

@media screen and (min-width: 800px) {
	form {
		width: 60%;
	}
}
</style>
