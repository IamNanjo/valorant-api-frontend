import { reactive } from "vue";

export interface MapIcons {
	[map: string]: { normal: string; large: string };
}

export interface RankIcons {
	[rank: string]: string;
}

export interface GlobalStore {
	userSearched: boolean;
	searchedUser: string;
	matchHistory: any[];
	mapIcons: MapIcons;
	rankIcons: RankIcons;
}

export const store = reactive<GlobalStore>({
	userSearched: false,
	searchedUser: "",
	matchHistory: [],
	mapIcons: {},
	rankIcons: {}
});
