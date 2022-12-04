interface Player {
	puuid: string;
	name: string;
	tag: string;
	team: string;
	level: number;
	character: string;
	currenttier_patched: string;
	assets: {
		card: {
			small: string;
			large: string;
			wide: string;
		};
		agent: {
			small: string;
			full: string;
			killfeed: string;
		};
	};
	stats: {
		score: number;
		kills: number;
		deaths: number;
		assists: number;
	};
}

interface Match {
	metadata: {
		map: string;
		game_length: number;
		game_start: number;
		rounds_played: number;
		mode: string;
		queue: string;
	};

	players: {
		all_players: Player[];
		red: Player[];
		blue: Player[];
	};

	teams: {
		red: {
			has_won: boolean;
			rounds_won: number;
		};
		blue: {
			has_won: boolean;
			rounds_won: number;
		};
	};
}

export { Player, Match };
