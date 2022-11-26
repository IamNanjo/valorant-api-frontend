import { reactive } from "vue";

export const store = reactive({
    userSearched: false,
    matchHistory: []
});
