import {
	IAccountsStatisticsResponse,
	IValidatorsStatisticsResponse,
	IDepoolsStatisticsResponse,
	ITransactionsStatisticsResponse,
	IBlocksListResponse,
	IBlocksRequestVariables,
	IBlocksSeqNoRangeResponse,
	IBlocksListParams,
	IKeyBlocksParams,
	IKeyBlocksRequestVariables,
	IKeyBlocksResponse,
	IBlockResponse,
	IBlockIdBySeqNoResponse,
	ITransactionsListVariables,
	ITransactionsListParams,
	ITransactionsListResponse,
	ITransactionResponse,
	IShortBlockResponse,
	ITransactionsForBlockVariables,
	ITransactionsForBlockResponse,
	IMessagesListRequestParams,
	IMessagesListRequestVariables,
	IMessagesListResponse,
	IMessageResponse,
	IMessagesListByAccountParams,
	IMessagesListByAccountVariables,
	IMessagesListByAccountResponse,
	ITransactionsByAccountParams,
	ITransactionsByAccountVariables,
	ITransactionsByAccountResponse,
	ITransfersByAccountParams,
	ITransfersByAccountVariables,
	ITransfersByAccountResponse,
	ITokensListParams,
	ITokensListResponse,
	ITokensListVariables,
	ITokenByAddressResponse,
	IWalletsByAddressParams,
	IWalletsByAddressResponse,
	IWalletsByAddressVariables,
	IAccountsListParams,
	IAccountsListResponse,
	IAccountsListVariables,
	IAccountByAddressResponse,
	IZeroStateResponse,
	IShardHashesReponse,
	ITransactionsCountVariables,
	ITransactionsCountResponse,
	IMessagesCountVariables,
	IMessagesCountResponse
} from './types';
import { IAllStatisticsResponse, IBlocksStatisticsResponse } from './types';
import {
	getAccountByAddress,
	getAccountsListQuery,
	getAccountsStatisticsQuery,
	getAllStatisticsQuery,
	getBlockIdBySeqNoQuery,
	getBlockQuery,
	getBlockShortInfoQuery,
	getBlocksListQuery,
	getBlocksSeqNoRangeQuery,
	getBlocksStatisticsQuery,
	getDepoolsStatisticsQuery,
	getHoldersByAddressQuery,
	getKeyBlocksQuery,
	getMessageQuery,
	getMessagesByAccountQuery,
	getMessagesCount,
	getMessagesListQuery,
	getShardHashesQuery,
	getTokenByAddressQuery,
	getTokensQuery,
	getTransactionQuery,
	getTransactionsByAccountQuery,
	getTransactionsCountQuery,
	getTransactionsForBlockQuery,
	getTransactionsQuery,
	getTransactionsStatisticsQuery,
	getTransfersByAccountQuery,
	getValidatorsStatisticsQuery,
	getZeroStateQuery
} from './queries';
import { shallowEqual } from 'react-redux';
const everEndpoint = "https://mainnet.evercloud.dev/3527832325ce483c931391bc41a166ac/graphql";


export const requestsAbortConroller = new AbortController()
export const statisticsAPI = {
	getAllData() {
		return request<IAllStatisticsResponse>(getAllStatisticsQuery(), everEndpoint);
	},
	getBlocksData() {
		return request<IBlocksStatisticsResponse>(getBlocksStatisticsQuery(), everEndpoint);
	},
	getAccountsData() {
		return request<IAccountsStatisticsResponse>(getAccountsStatisticsQuery(), everEndpoint);
	},
	getValidatorsData() {
		return request<IValidatorsStatisticsResponse>(getValidatorsStatisticsQuery(), everEndpoint);
	},
	getDepoolsData() {
		return request<IDepoolsStatisticsResponse>(getDepoolsStatisticsQuery(), everEndpoint);
	},
	getTransactionsData() {
		return request<ITransactionsStatisticsResponse>(getTransactionsStatisticsQuery(), everEndpoint);
	},
	getTransactionsCount(variables: ITransactionsCountVariables = {}) {
		return request<ITransactionsCountResponse, ITransactionsCountVariables>(
			getTransactionsCountQuery(),
			everEndpoint,
			variables
		)
	},
	getMessagesCount(variables: IMessagesCountVariables = {}) {
		return request<IMessagesCountResponse, IMessagesCountVariables>(
			getMessagesCount(),
			everEndpoint,
			variables
		)
	}
}

export const blocksAPI = {
	getBlockShortInfo(hash: string) {
		return request<IShortBlockResponse>(getBlockShortInfoQuery(hash), everEndpoint)
	},
	getBlocksList(params: IBlocksListParams = {}) {
		let variables: IBlocksRequestVariables = {
			cursor: params.cursor,
			workchain: params.workchain,
			thread: params.thread,
			minTrCount: params.minTrCount,
			maxTrCount: params.maxTrCount,
		}
		if (params.startTime || params.endTime) {
			return request<IBlocksSeqNoRangeResponse>(getBlocksSeqNoRangeQuery(params.startTime, params.endTime), everEndpoint)
				.then(response => {
					variables.startSeqNo = response.data.blockchain.master_seq_no_range.start;
					variables.endSeqNo = response.data.blockchain.master_seq_no_range.end;
					return request<IBlocksListResponse, IBlocksRequestVariables>(
						getBlocksListQuery(params.isOrderBySeqNoASC),
						everEndpoint,
						variables)
				})
		}
		return request<IBlocksListResponse, IBlocksRequestVariables>(
			getBlocksListQuery(params.isOrderBySeqNoASC),
			everEndpoint,
			variables);
	},
	getKeyBlocks(params: IKeyBlocksParams = {}) {
		let variables: IBlocksRequestVariables = {};
		if (params.cursor) variables.cursor = params.cursor;
		if (params.startTime || params.endTime) {
			return request<IBlocksSeqNoRangeResponse>(getBlocksSeqNoRangeQuery(params.startTime, params.endTime), everEndpoint)
				.then(response => {
					variables.startSeqNo = response.data.blockchain.master_seq_no_range.start;
					variables.endSeqNo = response.data.blockchain.master_seq_no_range.end;
					return request<IKeyBlocksResponse, IKeyBlocksRequestVariables>(
						getKeyBlocksQuery(params.isOrderBySeqNoASC),
						everEndpoint,
						variables)
				})
		}
		return request<IKeyBlocksResponse, { cursor: string } | {}>(
			getKeyBlocksQuery(params.isOrderBySeqNoASC),
			everEndpoint,
			variables);
	},
	getBlock(hash: string) {
		return request<IBlockResponse>(getBlockQuery(hash), everEndpoint)
	},
	getBlockIdBySeqNo(seqNo: number, workchain: number, thread: string) {
		return request<IBlockIdBySeqNoResponse>(getBlockIdBySeqNoQuery(seqNo, workchain, thread), everEndpoint)
	}
}
export const transactionsAPI = {
	getTransactionsList(params: ITransactionsListParams = {}) {
		let variables: ITransactionsListVariables = {
			cursor: params.cursor,
			workchain: params.workchain,
			minBalance: params.minBalance,
			maxBalance: params.maxBalance,
		}
		if (params.startTime || params.endTime) {
			return request<IBlocksSeqNoRangeResponse>(getBlocksSeqNoRangeQuery(params.startTime, params.endTime), everEndpoint)
				.then(response => {
					variables.startSeqNo = response.data.blockchain.master_seq_no_range.start;
					variables.endSeqNo = response.data.blockchain.master_seq_no_range.end;
					return request<ITransactionsListResponse, ITransactionsListVariables>(
						getTransactionsQuery(params.isOrderBySeqNoASC),
						everEndpoint,
						variables)
				})
		}
		return request<ITransactionsListResponse, ITransactionsListVariables>(
			getTransactionsQuery(params.isOrderBySeqNoASC),
			everEndpoint,
			variables);
	},
	getTransaction(hash: string) {
		return request<ITransactionResponse>(getTransactionQuery(hash), everEndpoint)
	},
	getTransactionsForBlock(variables: ITransactionsForBlockVariables) {
		return request<ITransactionsForBlockResponse, ITransactionsForBlockVariables>(
			getTransactionsForBlockQuery(),
			everEndpoint,
			variables)
	},
	getTransactionsByAccount(params: ITransactionsByAccountParams) {
		let variables: ITransactionsByAccountVariables = {
			accountAddress: params.accountAddress,
			minBalanceDelta: params.minBalanceDelta,
			maxBalanceDelta: params.maxBalanceDelta,
			cursor: params.cursor,
			aborted: params.aborted
		}
		if (params.startTime || params.endTime) {
			return request<IBlocksSeqNoRangeResponse>(getBlocksSeqNoRangeQuery(params.startTime, params.endTime), everEndpoint)
				.then(response => {
					variables.startSeqNo = response.data.blockchain.master_seq_no_range.start;
					variables.endSeqNo = response.data.blockchain.master_seq_no_range.end;
					return request<ITransactionsByAccountResponse, ITransactionsByAccountVariables>(
						getTransactionsByAccountQuery(params.isASC),
						everEndpoint,
						variables)
				})
		}
		return request<ITransactionsByAccountResponse, ITransactionsByAccountVariables>(
			getTransactionsByAccountQuery(params.isASC),
			everEndpoint,
			variables);
	}
}

export const messagesAPI = {
	getMessagesList(params: IMessagesListRequestParams = {}) {
		return request<IMessagesListResponse, IMessagesListRequestVariables>(
			getMessagesListQuery(params.isTimeASC),
			everEndpoint,
			{
				maxTime: params.maxTime,
				minTime: params.minTime,
				workchain: params.workchain,
				msgType: params.msgType,
				minValue: params.minValue,
				maxValue: params.maxValue,
			})
	},
	getMessage(hash: string) {
		return request<IMessageResponse>(getMessageQuery(hash), everEndpoint)
	},
	getMessagesByAccount(params: IMessagesListByAccountParams) {
		let variables: IMessagesListByAccountVariables = {
			accountAddress: params.accountAddress,
			msgType: params.msgType,
			minValue: params.minValue,
			cursor: params.cursor
		}
		if (params.startTime || params.endTime) {
			return request<IBlocksSeqNoRangeResponse>(getBlocksSeqNoRangeQuery(params.startTime, params.endTime), everEndpoint)
				.then(response => {
					variables.startSeqNo = response.data.blockchain.master_seq_no_range.start;
					variables.endSeqNo = response.data.blockchain.master_seq_no_range.end;
					return request<IMessagesListByAccountResponse, IMessagesListByAccountVariables>(
						getMessagesByAccountQuery(params.isTimeASC),
						everEndpoint,
						variables)
				})
		}
		return request<IMessagesListByAccountResponse, IMessagesListByAccountVariables>(
			getMessagesByAccountQuery(params.isTimeASC),
			everEndpoint,
			variables);
	}
}

export const tokensAPI = {
	getTransfersByAccount(params: ITransfersByAccountParams) {
		return request<ITransfersByAccountResponse, ITransfersByAccountVariables>(
			getTransfersByAccountQuery(params.isASC),
			everEndpoint,
			{
				accountAddress: params.accountAddress,
				cursor: params.cursor
			})
	},
	getTokensList(params: ITokensListParams = {}) {
		return request<ITokensListResponse, ITokensListVariables>(
			getTokensQuery(params.isDESC),
			everEndpoint, {
			cursor: params.cursor,
			namePrefix: params.namePrefix,
			symbolSubstring: params.symbolSubstring
		})
	},
	getTokenByAddress(address: string) {
		return request<ITokenByAddressResponse>(getTokenByAddressQuery(address), everEndpoint)
	},
	getHoldersByAddress(params: IWalletsByAddressParams) {
		return request<IWalletsByAddressResponse, IWalletsByAddressVariables>(
			getHoldersByAddressQuery(params.isDESC),
			everEndpoint, {
			address: params.address,
			cursor: params.cursor
		})
	}
}

export const accountsAPI = {
	getAccountsList(params: IAccountsListParams = {}) { //Возможно нужна будет возможность передачи последнего минимального баланса, но вряд ли
		return request<IAccountsListResponse, IAccountsListVariables>(
			getAccountsListQuery(params.isASC), everEndpoint, {
			prevLastId: params.prevLastId,
			prevMaxBalance: params.prevMaxBalance
		})
	},
	getAccountByAddress(address: string) {
		return request<IAccountByAddressResponse>(getAccountByAddress(address), everEndpoint)
	}
}

export const infoAPI = {
	getZeroState() {
		return request<IZeroStateResponse>(getZeroStateQuery(), everEndpoint);
	},
	getShardHashesList() {
		return request<IShardHashesReponse>(getShardHashesQuery(), everEndpoint)
	}
}

async function request<T, V = {}>(query: string, endPoint: string, variables?: V): Promise<T> {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const graphql = JSON.stringify({
		query,
		variables: variables ?? {}
	})
	const requestOptions: RequestInit = {
		method: 'POST',
		headers: myHeaders,
		body: graphql,
		redirect: 'follow',
		signal: requestsAbortConroller.signal
	};

	return fetch(endPoint, requestOptions)
		.then(response => response.json())
		.catch(error => console.log('error', error));
}
