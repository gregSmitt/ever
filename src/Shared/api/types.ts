interface ILocalizationGeneral {
	"navigation": {
		"blockchain": string
		"blocks": string
		"messages": string
		"transactions": string
		"zero": string
		"contracts": string
		"accounts": string
		"smart_contaracts": string
		"tip3": string
		"KWT": string
		"NFT": string
		"staking": string
		"validators": string
		"depools": string
	},
	"legal": string
}

export interface ILocalizationGeneralResponse {
	"en": ILocalizationGeneral,
	"ru": ILocalizationGeneral
}

interface IlocalizationLanding {
	"title": string
	"intro": {
		"part_1": string
		"part_2_ever_link": string
		"part_3": string
		"part_4_api_link": string
	},
	"blocks": {
		"amount": string
		"amount_desc": string
		"avg": string
		"avg_desc": string
	},
	"accounts": {
		"supply": string
		"supply_desc": string
		"сirculating": string
		"сirculating_desc": string
		"total": string
		"total_desc": string
		"new24h": string
		"new24h_desc": string
	},
	"depools": {
		"active": string
		"active_desc": string
		"stakes": string
		"stakes_desc": string
	},
	"validators": {
		"total": string
		"total_desc": string
		"staked": string
		"staked_desc": string
		"year_rewards": string
		"year_rewards_desc": string
		"rewards_30_days": string
		"rewards_30_days_desc": string
	},
	"transactions": {
		"total": string
		"total_desc": string
		"total24h": string
		"total24h_desc": string
	}
}
export interface ILocalizationLandingResponse {
	"ru": IlocalizationLanding,
	"en": IlocalizationLanding
}





//! 

export interface IPageInfo {
	hasPreviousPage: boolean
	hasNextPage: boolean
	startCursor: string
	endCursor: string
}
//Statistics
export interface IBlocksStatistics {
	totalCount: number | null,
	ratePerSecond: number | null,
	countByCurrentValidators: number | null
}
export interface IAccountsStatistics {
	totalSupply: string | null,
	circulatingSupply: string | null,
	totalCount: number | null,
	lastDayCount: number | null
	amountOnGivers: number | null
}
export interface IDepoolsStatistics {
	activeDepoolCount: number | null,
	totalStaked: string | null
}
export interface IValidatorsStatistics {
	totalCount: number | null,
	totalStaked: string | null,
	apr: number | null,
	rewardsPer30Days: string | null
}
export interface ITransactionsStatistics {
	lastDayOrdinaryCount: number | null
	totalOrdinaryCount: number | null
}
export interface IBlocksStatisticsResponse {
	data: { statistics: { blocks: IBlocksStatistics } }
}
export interface IAccountsStatisticsResponse {
	data: { statistics: { accounts: IAccountsStatistics } }
}
export interface IDepoolsStatisticsResponse {
	data: { statistics: { depools: IDepoolsStatistics } }
}
export interface IValidatorsStatisticsResponse {
	data: { statistics: { validators: IValidatorsStatistics } }
}
export interface ITransactionsStatisticsResponse {
	data: { statistics: { transactions: ITransactionsStatistics } }
}
export interface IAllStatisticsResponse {
	data: {
		statistics: {
			blocks: IBlocksStatistics,
			accounts: Omit<IAccountsStatistics, 'amountOnGivers'>,
			depools: IDepoolsStatistics,
			validators: IValidatorsStatistics,
			transactions: ITransactionsStatistics,
		}
	}
}

//Blocks
export interface IBlocksListParams {
	cursor?: string,
	workchain?: number,
	thread?: string,
	minTrCount?: number,
	maxTrCount?: number,
	startTime?: number | null,
	endTime?: number | null,
	isOrderBySeqNoASC?: boolean
}
export interface IKeyBlocksParams {
	cursor?: string,
	startTime?: number | null,
	endTime?: number | null,
	isOrderBySeqNoASC?: boolean
}
export interface IKeyBlocksRequestVariables {
	cursor?: string,
	startSeqNo?: number | null,
	endSeqNo?: number | null
}
export interface IBlocksRequestVariables {
	cursor?: string,
	workchain?: number,
	thread?: string,
	minTrCount?: number,
	maxTrCount?: number,
	startSeqNo?: number | null,
	endSeqNo?: number | null
}
export interface IBlocksListPoint {
	workchain_id: number,
	gen_software_version: number,
	gen_utime: number,
	shard: string,
	seq_no: number,
	hash: string,
	tr_count: number
}

export interface IBlocksListResponse {
	data: {
		blockchain: {
			blocks: {
				edges: {
					node: IBlocksListPoint
				}[],
				pageInfo: IPageInfo
			}
		}
	}
}

export interface IKeyBlocksResponse {
	data: {
		blockchain: {
			key_blocks: {
				edges: {
					node: IBlocksListPoint
				}[],
				pageInfo: IPageInfo
			}
		}
	}
}

export interface IBlocksSeqNoRangeResponse {
	data: {
		blockchain: {
			master_seq_no_range: {
				start: number | null
				end: number | null
			}
		}
	}
}
export interface IShortBlockResponse {
	data: {
		blockchain: {
			block: {
				seq_no: number,
				shard: string,
				workchain_id: number
			} | null
		}
	}
}
export interface IBlockResponse {
	data: {
		blockchain: {
			block: {
				id: string
				gen_utime: number | null
				seq_no: number | null
				workchain_id: number | null
				shard: string | null
				gen_software_version: number | null
				prev_key_block_seqno: number | null
				end_lt: string | null
				start_lt: string | null
				global_id: number | null
				gen_catchain_seqno: number | null
				master_ref: {
					root_hash: string | null
				} | null
				prev_ref: {
					root_hash: string | null
				} | null
				version: number | null
				gen_validator_list_hash_short: number | null
				after_merge: boolean | null
				after_split: boolean | null
				before_split: boolean | null
				want_merge: boolean | null
				want_split: boolean | null
				vert_seq_no: number | null
				min_ref_mc_seqno: number | null
				gen_software_capabilities: string | null
				rand_seed: string | null
				in_msg_descr:
				{
					msg_type: number | null
					msg_id: string | null
					ihr_fee: string | null
					in_msg: {
						msg_id: string | null
						next_addr: string | null
						cur_addr: string | null
						fwd_fee_remaining: string | null
					} | null
					transit_fee: string | null
					transaction_id: string | null
				}[] | null
				value_flow: {
					to_next_blk: string | null
					exported: string | null
					fees_collected: string | null
					created: string | null
					imported: string | null
					from_prev_blk: string | null
					minted: string | null
					fees_imported: string | null
				},
				account_blocks:
				{
					account_addr: string | null
					old_hash: string | null
					new_hash: string | null
					tr_count: number | null
				}[] | null
			} | null
		} | null
	}
}

export interface IBlockIdBySeqNoResponse {
	data: {
		blockchain: {
			block_by_seq_no: {
				id: string
			} | null
		}
	}
}

export interface ITransactionsListResponse {
	data: {
		blockchain: {
			transactions: {
				edges: {
					node: {
						hash: string | null
						now: number | null
						tr_type: number | null
						account_addr: string | null
						balance_delta: string | null
					}
				}[]
				pageInfo: IPageInfo
			}
		}
	}
}
export interface ITransactionsListVariables {
	minBalance?: string
	maxBalance?: string
	startSeqNo?: number | null
	endSeqNo?: number | null
	workchain?: number
	cursor?: string
}
export interface ITransactionsListParams {
	cursor?: string,
	workchain?: number,
	minBalance?: string,
	maxBalance?: string,
	startTime?: number | null,
	endTime?: number | null,
	isOrderBySeqNoASC?: boolean
}

export interface ITransactionResponse {
	data: {
		blockchain: {
			transaction: {
				hash: string
				tr_type: number
				now: number
				account_addr: string | null
				balance_delta: string | null
				in_message: {
					src: string | null
				} | null
				out_messages: {
					dst: string | null
				}[] | null
				aborted: boolean | null
				in_msg: string | null
				out_msgs: string[] | null
				storage: {
					storage_fees_collected: string
					storage_fees_due: string
					status_change: number
				} | null
				compute: {
					gas_limit: string | null
					gas_fees: string | null
					gas_used: string | null
					gas_credit: number | null
					compute_type: number | null
					success: boolean | null
					msg_state_used: boolean | null
					account_activated: boolean | null
					mode: number | null
					exit_code: number | null
					vm_steps: number | null
					vm_init_state_hash: string | null
					vm_final_state_hash: string | null
				} | null
				action: {
					success: boolean | null
					valid: boolean | null
					no_funds: boolean | null
					status_change: number | null
					total_fwd_fees: string | null
					total_action_fees: string | null
					result_code: number | null
					tot_actions: number | null
					spec_actions: number | null
					skipped_actions: number | null
					msgs_created: number | null
					action_list_hash: string | null
				} | null
				bounce: {
					msg_fees: string | null
				} | null
				ext_in_msg_fee: string | null
				destroyed: boolean | null
				lt: string | null
				prev_trans_hash: string | null
				prev_trans_lt: string | null
				outmsg_cnt: number | null
				orig_status: number | null
				end_status: number | null
				old_hash: string | null
				new_hash: string | null
				credit_first: boolean | null
			} | null
		}
	}
}

export interface ITransactionsForBlockResponse {
	data: {
		transactions: {
			id: string
			now: number
			tr_type: number
			account_addr: string | null
			balance_delta: string | null
		}[]
	}
}

export interface ITransactionsForBlockVariables {
	blockId: string,
	minBalance?: string,
	maxBalance?: string
	aborted?: true
}

export interface IMessagesListRequestVariables {
	maxTime?: number
	minTime?: number
	workchain?: number
	msgType?: number
	minValue?: string
	maxValue?: string
}

export interface IMessagesListRequestParams extends IMessagesListRequestVariables {
	isTimeASC?: boolean
}

export interface IMessagesListResponse {
	data: {
		messages: {
			id: string
			value: string | null
			src: string | null
			dst: string | null
			created_at: number
			msg_type: number
		}[]
	}
}


export interface IMessageResponse {
	data: {
		blockchain: {
			message: {
				hash: string
				msg_type: number
				created_at: number
				src: string | null
				dst: string | null
				value: string | null
				src_transaction: {
					hash: string
				} | null
				dst_transaction: {
					hash: string
				} | null
				created_lt: string | null
				ihr_fee: string | null
				fwd_fee: string | null
				bounce: boolean
				bounced: boolean
			}
		}
	}
}

export interface IMessagesListByAccountResponse {
	data: {
		blockchain: {
			account: {
				messages: {
					edges: {
						node: {
							hash: string
							created_at: number
							value: string
							msg_type: number
							src: string | null
							dst: string | null
						}
					}[]
					pageInfo: IPageInfo
				}
			} | null
		}
	}
}

export interface IMessagesListByAccountVariables {
	accountAddress: string
	msgType?: Array<"ExtIn" | "ExtOut" | "IntIn" | "IntOut">,
	minValue?: string,
	cursor?: string,
	startSeqNo?: number | null,
	endSeqNo?: number | null
}

export interface IMessagesListByAccountParams extends
	Omit<IMessagesListByAccountVariables, 'startSeqNo' | 'endSeqNo'> {
	isTimeASC?: boolean
	startTime?: number
	endTime?: number
}

export interface ITransactionsByAccountResponse {
	data: {
		blockchain: {
			account: {
				transactions: {
					edges: {
						hash: string
						now: number
						tr_type: number
						balance_delta: string
					}
					pageInfo: IPageInfo
				}
			}
		}
	}
}

export interface ITransactionsByAccountVariables {
	accountAddress: string
	minBalanceDelta?: string
	maxBalanceDelta?: string
	cursor?: string
	startSeqNo?: number | null
	endSeqNo?: number | null
	aborted?: boolean
}

export interface ITransactionsByAccountParams extends
	Omit<ITransactionsByAccountVariables, 'startSeqNo' | 'endSeqNo'> {
	isASC?: boolean
	startTime?: number
	endTime?: number
}

export interface ITransfersByAccountResponse {
	data: {
		blockchain: {
			account: {
				info: {
					tokenHolder: {
						transfers: {
							nodes: {
								messageId: string | null,
								fromHolder: {
									address: string | null
								}
								value: string | null
								timestamp: number
								token: {
									symbol: string
								}
							}[]
							pageInfo: IPageInfo
						}
					}
				} | null
			}
		}
	}
}

export interface ITransfersByAccountVariables {
	accountAddress: string,
	cursor?: string
}

export interface ITransfersByAccountParams extends ITransfersByAccountVariables {
	isASC?: boolean
}

export interface ITokensListResponse {
	data: {
		ft: {
			tokens: {
				nodes: {
					name: string
					address: string
					totalSupply: string
					decimals: number
				}[]
				pageInfo: IPageInfo
			}
		}
	}
}

export interface ITokensListVariables {
	cursor?: string
	namePrefix?: string
	symbolSubstring?: string
}

export interface ITokensListParams extends ITokensListVariables {
	isDESC?: boolean
}

export interface ITokenByAddressResponse {
	data: {
		ft: {
			token: {
				address: string
				symbol: string
				totalSupply: string
				decimals: number
				rootOwner: string
				statistics: {
					totalWalletCount: number
				}
			} | null
		}
	}
}

export interface IWalletsByAddressResponse {
	data: {
		ft: {
			token: {
				wallets: {
					nodes: {
						address: string //wallet's address
						holder: {
							address: string // holder's address
						}
						balance: string
						percentage: number
					}[]
					pageInfo: IPageInfo
				}
			} | null
		}
	}
}

export interface IWalletsByAddressVariables {
	address: string
	cursor?: string
}

export interface IWalletsByAddressParams extends IWalletsByAddressVariables {
	isDESC?: boolean
}

export interface IAccountsListResponse {
	data: {
		accounts: {
			id: string
			balance: string | null
			last_paid: number | null
		}[] | null
	}
}

export interface IAccountsListVariables {
	prevMaxBalance?: String,
	prevLastId?: String
}

export interface IAccountsListParams extends IAccountsListVariables {
	isASC?: boolean
}

export interface IAccountByAddressResponse {
	data: {
		blockchain: {
			account: {
				info: {
					id: string
					balance: string | null
					last_paid: number | null
					acc_type: number
					due_payment: string | null
					last_trans_lt: string | null
					balance_other: {
						value: number
						currency: string
					} | null
					tick: boolean | null
					tock: boolean | null
					code_hash: string | null
					data_hash: string | null
					library_hash: string | null
					code: string | null
					data: string | null
					library: string | null
					proof: string | null
				} | null
			}
		}
	}
}

export interface IZeroStateResponse {
	data: {
		zerostates: {
			id: string
			global_id: number
			workchain_id: number
			total_balance: string
			master: {
				global_balance: string
				validator_list_hash_short: number
				config: {
					p0: string
					p1: string
					p2: string
					p7: {
						value: string
						currency: number
					}[]
					p8: {
						version: number
						capabilities: string
					}
					p9: number[]
					p10: number[]
					p11: {
						normal_params: {
							min_tot_rounds: number
							max_tot_rounds: number
							min_wins: number
							max_losses: number
							min_store_sec: number
							max_store_sec: number
							bit_price: number
							cell_price: number
						}
						critical_params: {
							min_tot_rounds: number
							max_tot_rounds: number
							min_wins: number
							max_losses: number
							min_store_sec: number
							max_store_sec: number
							bit_price: number
							cell_price: number
						}
					}
					p12: {
						workchain_id: number
						enabled_since: number
						actual_min_split: number
						min_split: number
						max_split: number
						active: boolean
						accept_msgs: boolean
						flags: number
						zerostate_root_hash: string
						zerostate_file_hash: string
						version: number
						basic: boolean
						vm_version: number
						vm_mode: string
					}
					p14: {
						basechain_block_fee: string
						masterchain_block_fee: string
					}
					p15: {
						validators_elected_for: number
						elections_start_before: number
						elections_end_before: number
						stake_held_for: number
					}
					p16: {
						max_main_validators: number
						max_validators: number
						min_validators: number
					}
					p17: {
						max_stake: string
						max_stake_factor: number
						min_stake: string
						min_total_stake: string
					}
					p18: {
						utime_since: number
						bit_price_ps: string
						cell_price_ps: string
						mc_bit_price_ps: string
						mc_cell_price_ps: string
					}
					p20: {
						gas_price: string
						gas_limit: string
						special_gas_limit: string
						gas_credit: string
						block_gas_limit: string
						freeze_due_limit: string
						delete_due_limit: string
						flat_gas_limit: string
						flat_gas_price: string
					}
					p21: {
						gas_price: string
						gas_limit: string
						special_gas_limit: string
						gas_credit: string
						block_gas_limit: string
						freeze_due_limit: string
						delete_due_limit: string
						flat_gas_limit: string
						flat_gas_price: string
					}
					p22: {
						bytes: {
							underload: number
							soft_limit: number
							hard_limit: number
						}
						gas: {
							underload: number
							soft_limit: number
							hard_limit: number
						}
						lt_delta: {
							underload: number
							soft_limit: number
							hard_limit: number
						}
					}
					p23: {
						bytes: {
							underload: number
							soft_limit: number
							hard_limit: number
						}
						gas: {
							underload: number
							soft_limit: number
							hard_limit: number
						}
						lt_delta: {
							underload: number
							soft_limit: number
							hard_limit: number
						}
					}
					p24: {
						lump_price: string
						bit_price: string
						cell_price: string
						ihr_price_factor: number
						first_frac: number
						next_frac: number
					}
					p25: {
						lump_price: string
						bit_price: string
						cell_price: string
						ihr_price_factor: number
						first_frac: number
						next_frac: number
					}
					p28: {
						mc_catchain_lifetime: number
						shard_catchain_lifetime: number
						shard_validators_lifetime: number
						shard_validators_num: number
					}
					p29: {
						round_candidates: number
						next_candidate_delay_ms: number
						consensus_timeout_ms: number
						fast_attempts: number
						attempt_duration: number
						catchain_max_deps: number
						max_block_bytes: number
						max_collated_bytes: number
					}
					p31: string[]
				}
			}
		}[]
	}
}

export interface IShardHashesReponse {
	data: {
		blockchain: {
			blocks: {
				edges: {
					node: {
						master: {
							shard_hashes: {
								workchain_id: number
								shard: string
								descr: {
									gen_utime: number
								}
							}[]
						}
					}
				}[]
			}
		}
	}
}

export interface ITransactionsCountResponse {
	data: {
		aggregateTransactions: string[]
	}
}//?как-то это можно отрефакторить 
export interface IMessagesCountResponse {
	data: {
		aggregateMessages: string[]
	}
}

export interface ITransactionsCountVariables {
	startTime?: number,
	endTime?: number,
	minBalanceDelta?: String,
	maxBalanceDelta?: String,
	workchain?: number
}

export interface IMessagesCountVariables {
	startTime?: number,
	endTime?: number,
	workchain?: number,
	msgType?: number,
	minValue?: String,
	maxValue?: String
}