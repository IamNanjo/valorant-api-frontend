import { reactive } from "vue";

export const store = reactive({
	userSearched: false,
	searchedUser: ["", ""],
	matchHistory: [],
	mapIcons: {},
	rankIcons: {}
});
