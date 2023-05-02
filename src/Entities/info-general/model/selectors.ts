import { IState, key } from './'

export const getShards = (state: IState) => state[key].shards
export const getChains = (state: IState) => state[key].chains