export interface IShard {
	id: number,
	gen_utime: number,
	shard: string,
	workchain_id: number
}

export interface IInitialState {
	chains: { id: number, sign: number }[]
	shards: IShard[] | null
}
