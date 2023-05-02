export function getAllStatisticsQuery() {
	return `query{
		statistics{
			blocks{
			totalCount
			ratePerSecond
			countByCurrentValidators
		  }
			accounts{
			totalSupply
			circulatingSupply
			totalCount
			lastDayCount
		  }
			depools{
			activeDepoolCount
			totalStaked
		  }
			validators{
			totalCount
			totalStaked
			apr
			rewardsPer30Days
		  }
			transactions{
			totalOrdinaryCount
			lastDayOrdinaryCount
		  }
		}
	 }`
}
export function getBlocksStatisticsQuery() {
	return `query{
		statistics{
			blocks{
				totalCount
				ratePerSecond
				countByCurrentValidators
			}
		}
	}`
}
export function getAccountsStatisticsQuery() {
	return `query{
		statistics{
			accounts{
				totalSupply
				circulatingSupply
				totalCount
				lastDayCount
				amountOnGivers
		  }
		}
	}`
}
export function getDepoolsStatisticsQuery() {
	return `query{
		statistics{
			depools{
				activeDepoolCount
				totalStaked
		  }
		}
	}`
}
export function getValidatorsStatisticsQuery() {
	return `query{
		statistics{
			validators{
				totalCount
				totalStaked
				apr
				rewardsPer30Days
		  }
		}
	}`
}
export function getTransactionsStatisticsQuery() {
	return `query{
		statistics{
			transactions{
			totalOrdinaryCount
			lastDayOrdinaryCount
		  }
		}
	}`
}

export function getBlocksListQuery(isTimeASC: boolean = false) {
	return `query (
			$cursor: String,
			$workchain: Int,
			$thread: String,
			$minTrCount: Int,
			$maxTrCount: Int,
			$startSeqNo: Int,
			$endSeqNo: Int
		){
		blockchain{
			blocks(
				${isTimeASC ? 'first: 25' : 'last: 25'}
				${isTimeASC ? 'after: $cursor' : 'before: $cursor'}
				workchain: $workchain
				thread: $thread
				min_tr_count: $minTrCount
				max_tr_count: $maxTrCount
				master_seq_no_range:{
					start: $startSeqNo
					end: $endSeqNo
				}
		) {
			edges {
				node {
					workchain_id
					gen_software_version
					gen_utime 
					shard
					seq_no
					hash
					tr_count
				}
			}
				pageInfo{
					endCursor
					startCursor
					hasPreviousPage
					hasNextPage
				}
			}
		}
	}`
}

export function getBlocksSeqNoRangeQuery(start: number | null = null, end: number | null = null) {
	return `query{
		blockchain{
			master_seq_no_range(time_start: ${start}, time_end: ${end}){
				start
				end
			}
		}
	}`
}

export function getKeyBlocksQuery(isTimeASC: boolean = false) {
	return `query(
		$cursor: String,
		$startSeqNo: Int,
		$endSeqNo: Int
	){
		blockchain{
			key_blocks(
				${isTimeASC ? 'first: 25' : 'last: 25'}
				${isTimeASC ? 'after: $cursor' : 'before: $cursor'}
				master_seq_no_range:{
					start: $startSeqNo
					end: $endSeqNo
				}
			){
				edges{
					node{
						workchain_id
						gen_software_version
						gen_utime 
						shard
						seq_no
						hash
						tr_count
					}
				}
				pageInfo{
					endCursor
					startCursor
					hasPreviousPage
					hasNextPage
				}
			}
		}
	}`
}

export function getBlockQuery(hash: string) {
	return `query{
		blockchain{
			block(hash: "${hash}"){
				id
				gen_utime
				seq_no
				workchain_id
				shard
				gen_software_version
				prev_key_block_seqno
				end_lt(format: DEC)
				start_lt(format: DEC)
				global_id 
				gen_catchain_seqno
				master_ref{
					root_hash
				}
				prev_ref{
					root_hash
				}
				version
				gen_validator_list_hash_short
				after_merge
				after_split
				before_split
				want_merge
				want_split
				vert_seq_no
				min_ref_mc_seqno
				gen_software_capabilities
				rand_seed
				in_msg_descr{
					msg_type
					msg_id
					ihr_fee(format: DEC)
					in_msg{
						msg_id,
						next_addr
						cur_addr
						fwd_fee_remaining(format: DEC)
					}
					transit_fee(format: DEC)
					transaction_id
				}
				value_flow{
					to_next_blk(format: DEC)
					exported(format: DEC)
					fees_collected(format: DEC)
					created(format: DEC)
					imported(format: DEC)
					from_prev_blk(format: DEC)
					minted(format: DEC)
					fees_imported(format: DEC)
				}
				account_blocks{
					account_addr
					old_hash
					new_hash
					tr_count
				}
			}
		}
	}`
}

export function getBlockShortInfoQuery(hash: string) {
	return `query{
		blockchain{
			block(hash:"${hash}"){
				seq_no, 
				shard, 
				workchain_id
			}
		}
	}`
}

export function getBlockIdBySeqNoQuery(seqNo: number, workchain: number, thread: string) {
	return `query{
		blockchain{
			block_by_seq_no(
				workchain: ${workchain}
				thread: "${thread}"
				seq_no: ${seqNo}
			){
				id
			}
		}
	}`
}

export function getTransactionsQuery(isTimeASC: boolean = false) {
	return `query($minBalance: String, $maxBalance: String, $startSeqNo: Int, $endSeqNo: Int, $workchain:Int, $cursor: String) {
		blockchain {
			transactions(
				${isTimeASC ? "first: 25" : "last: 25"}
				${isTimeASC ? "after: $cursor" : "before: $cursor"}
				min_balance_delta: $minBalance
				max_balance_delta: $maxBalance
				workchain: $workchain
				master_seq_no_range: {
				start: $startSeqNo
				end: $endSeqNo
			}
			) {
				edges {
					node {
						hash
						now
						tr_type
						account_addr
						balance_delta(format: DEC)
					}
				}
				pageInfo {
					endCursor
					startCursor
					hasNextPage
					hasPreviousPage
				}
			}
		}
	}`
}

export function getTransactionQuery(hash: string) {
	return `query{
		blockchain{
			transaction(hash: "${hash}"){
				hash
				tr_type
				now
				account_addr
				balance_delta
				in_message{
					src
				}
				out_messages{
					dst
				}
				aborted
				in_msg
				out_msgs
				storage{
						storage_fees_collected(format:DEC)
						storage_fees_due(format: DEC)
						status_change
				}
				compute{
					gas_limit(format:DEC)
					gas_fees(format:DEC)
					gas_used(format:DEC)
					gas_credit
					compute_type
					success
					msg_state_used
					account_activated
					mode
					exit_code
					vm_steps
					vm_init_state_hash
					vm_final_state_hash
				}
				action{
					success
					valid
					no_funds
					status_change
					total_fwd_fees(format:DEC)
					total_action_fees(format:DEC)
					result_code
					tot_actions
					spec_actions
					skipped_actions
					msgs_created
					action_list_hash
				}
				bounce{
					msg_fees(format:DEC)
				}
				ext_in_msg_fee(format: DEC)
				destroyed
				lt(format: DEC)
				prev_trans_hash
				prev_trans_lt(format: DEC)
				outmsg_cnt
				orig_status
				end_status
				old_hash 
				new_hash
				credit_first
				block_id
			}
		}
	}`
}

export function getTransactionsForBlockQuery() {
	return `query($blockId: String, $minBalance: String, $maxBalance: String, $aborted: Boolean){
		transactions(filter:{
			block_id:{eq:$blockId}
			balance_delta: {
				ge: $minBalance
				le: $maxBalance
			}
			aborted: {eq: $aborted}
		}){
			id
			now
			tr_type
			account_addr
			balance_delta(format: DEC)
		}
	}`
}

export function getMessagesListQuery(isTimeASC: boolean = false) {
	return `query (
		$maxTime: Float,
		$minTime: Float,
		$workchain: Int,
		$msgType: Int,
		$minValue: String,
		$maxValue: String
	){
		messages(
			filter:{
				value:{
					le: $maxValue
					ge: $minValue
				}
				msg_type:{eq:$msgType}
				created_at:{
					le: $maxTime
					ge: $minTime
				}
				dst_workchain_id: {eq: $workchain}
				OR:{
					value:{
						le: $maxValue
						ge: $minValue
					}
					msg_type:{eq:$msgType}
					created_at:{
						le: $maxTime
						ge: $minTime
					}
					src_workchain_id: {eq: $workchain}
				}
			}
			orderBy: [
				{
					path: "created_at"
					direction: ${isTimeASC ? 'ASC' : 'DESC'}
				}
			]
			limit: 25
		) {
			id
			value(format: DEC)
			src
			dst
			created_at
			msg_type
		}
	}`
}

export function getMessagesCount() {
	return `query(
		$startTime: Float, 
		$endTime: Float,
		$workchain: Int,
		$msgType: Int,
		$minValue: String,
		$maxValue: String
	) {
		aggregateMessages(
			filter: {
				msg_type:{eq:$msgType}
				created_at: {
					ge: $startTime
					le: $endTime
				}
				value: {
					ge: $minValue
					le: $maxValue
				}
				dst_workchain_id: {eq: $workchain}
				OR:{
					msg_type:{eq:$msgType}
					created_at: {
						ge: $startTime
						le: $endTime
					}
					value: {
						ge: $minValue
						le: $maxValue
					}
					src_workchain_id: {eq: $workchain}
				}
			}
		)
	}`
}

export function getMessageQuery(hash: string) {
	return `query{
		blockchain{
			message(hash:"${hash}"){
				hash
				msg_type
				created_at
				src
				dst
				value(format: DEC)
				src_transaction{
					id
				}
				dst_transaction{
					id
				}
				created_lt(format: DEC)
				ihr_fee(format: DEC)
				fwd_fee(format: DEC)
				bounce
				bounced
			}
		}
	}`
}


export function getMessagesByAccountQuery(isTimeASC: boolean = false) {
	return `query(
		$msgType: [BlockchainMessageTypeFilterEnum!], 
		$minValue:String, 
		$cursor: String,
		$startSeqNo: Int,
		$endSeqNo: Int
		$accountAddress: String!
	){
		blockchain{
			account(address:$accountAddress){
				messages(
					${isTimeASC ? "first: 25" : "last: 25"}
					${isTimeASC ? "after: $cursor" : "before: $cursor"}
					msg_type: $msgType
					min_value: $minValue
					master_seq_no_range:{
						start: $startSeqNo
						end: $endSeqNo
					}
				){
					edges{
						node{
							hash
							created_at
							value(format: DEC)
							msg_type
							src
							dst
						}
					}
					pageInfo{
						startCursor
						endCursor
						hasPreviousPage
						hasNextPage
					}
				}
			}
		}
	}`
}

export function getTransactionsByAccountQuery(isASC: boolean = false) {
	return `query(
		$accountAddress: String!
		$minBalanceDelta: String,
		$maxBalanceDelta: String,
		$cursor: String,
		$startSeqNo: Int,
		$endSeqNo: Int
		$aborted: Boolean
	){
		blockchain{
			account(address:$accountAddress){
				transactions(
					${isASC ? "first: 25" : "last: 25"}
					${isASC ? "after: $cursor" : "before: $cursor"}
					aborted: $aborted
					min_balance_delta: $minBalanceDelta
					max_balance_delta: $maxBalanceDelta
					master_seq_no_range:{
						start: $startSeqNo
						end: $endSeqNo
					}
				){
					edges{
						node{
							hash
							now
							tr_type
							balance_delta(format:DEC)
						}
					}
					pageInfo{
						startCursor
						endCursor
						hasPreviousPage
						hasNextPage
					}
				}
			}
		}
	}`
}

export function getTransfersByAccountQuery(isASC: boolean = false) {
	return `query($accountAddress: String!, $cursor: String){
		blockchain{
			account(address: $accountAddress){
				info{
					tokenHolder{
						transfers(
							${isASC ? "first: 25" : "last: 25"}
							${isASC ? "after: $cursor" : "before: $cursor"}
						){
							nodes{
								messageId
								fromHolder{address}
								value
								timestamp
								token{
									symbol
								}
							}	
							pageInfo{
								startCursor
								endCursor
								hasNextPage
								hasPreviousPage
							}
						}
					}
				}
			}
		}
	}`
}

export function getTokensQuery(isDESC: boolean = true) {
	return `query($cursor: String, $namePrefix: String, $symbolSubstring: String){
		ft{
			tokens(
				${isDESC ? "first: 25" : "last: 25"}
				${isDESC ? "after: $cursor" : "before: $cursor"}
				orderBy: LAST_TRANSFER_FIRST
				namePrefix: $namePrefix
				symbolSubstring: $symbolSubstring
			){
				nodes{
					name
					address
					totalSupply
					decimals
				}
				pageInfo{
					startCursor
					endCursor
					hasNextPage
					hasPreviousPage
				}
			}
		}
	}`
}

export function getTokenByAddressQuery(address: string) {
	return `query{
		ft{
			token(address: "${address}"){
				address
				symbol
				address
				totalSupply
				decimals
				rootOwner
				totalSupply
				statistics{
					totalWalletCount
				}
			}
		}
	}`
}

export function getHoldersByAddressQuery(isDESC: boolean = true) {
	return `query($address: String!, $cursor: String){
		ft{
			token(address: $address){
				wallets(
					${isDESC ? "first: 25" : "last: 25"}
					${isDESC ? "after: $cursor" : "before: $cursor"}
				){
					nodes{
						address
						holder{address}
						balance
						percentage
					}
						pageInfo{
						startCursor
						endCursor
						hasNextPage
						hasPreviousPage
					}
				}
			}
		}
	}`
}

export function getAccountsListQuery(isASC: boolean = false) {
	return `query(${isASC ? "$prevLastId: String" : "$prevMaxBalance: String"}){
		accounts(
		filter: {
				${isASC ? "id: {gt:$prevLastId}" : "balance: {le: $prevMaxBalance}"}
			}
			orderBy: [
				{path:"balance" direction: ${isASC ? "ASC" : "DESC"} }
				${isASC ? "{path:\"id\" direction: ASC}" : ''}
			]
			limit: 25
		)
		{id balance(format: DEC) last_paid}
	}`
}

export function getAccountByAddress(address: string) {
	return `query{
		blockchain{
			account(address:"${address}"){
				info{
					id 
					balance(format: DEC) 
					last_paid
					acc_type
					due_payment(format: DEC)
					last_trans_lt(format: DEC)
					balance_other {
							value
							currency
					}
					tick
					tock
					code_hash
					data_hash
					library_hash
					code
					data
					library
					proof
				}
			}
		}
	}`
}

export function getZeroStateQuery() {
	return `query{
		zerostates{
			id
			global_id
			workchain_id
			total_balance(format: DEC)
			master{
				global_balance(format:DEC)
				validator_list_hash_short
				config{
					p0 
					p1 
					p2 
					p7{
						value
						currency
					}
					p8{
						version
						capabilities
					}
					p9
					p10
					p11{
						normal_params{
							min_tot_rounds
							max_tot_rounds
							min_wins
							max_losses
							min_store_sec
							max_store_sec
							bit_price
							cell_price
						}
						critical_params{
							min_tot_rounds
							max_tot_rounds
							min_wins
							max_losses
							min_store_sec
							max_store_sec
							bit_price
							cell_price
						}
					}
					p12{
						workchain_id
						enabled_since
						actual_min_split
						min_split
						max_split
						active
						accept_msgs
						flags
						zerostate_root_hash
						zerostate_file_hash
						version
						basic
						vm_version
						vm_mode
					}
					p14{
						basechain_block_fee(format: DEC)
						masterchain_block_fee(format: DEC)
					}
					p15{
						validators_elected_for
						elections_start_before
						elections_end_before
						stake_held_for
					}
					p16{
						max_main_validators
						max_validators
						min_validators
					}
					p17{
						max_stake(format: DEC)
						max_stake_factor
						min_stake(format: DEC)
						min_total_stake(format: DEC)
					}
					p18{
						utime_since
						bit_price_ps(format: DEC)
						cell_price_ps(format: DEC)
						mc_bit_price_ps(format: DEC)
						mc_cell_price_ps(format: DEC)
					}
					p20{
						gas_price(format: DEC)
						gas_limit(format: DEC)
						special_gas_limit(format: DEC)
						gas_credit(format: DEC)
						block_gas_limit(format: DEC)
						freeze_due_limit(format: DEC)
						delete_due_limit(format: DEC)
						flat_gas_limit(format: DEC)
						flat_gas_price(format: DEC)
					}
					p21 {
						gas_price(format: DEC)
						gas_limit(format: DEC)
						special_gas_limit(format: DEC)
						gas_credit(format: DEC)
						block_gas_limit(format: DEC)
						freeze_due_limit(format: DEC)
						delete_due_limit(format: DEC)
						flat_gas_limit(format: DEC)
						flat_gas_price(format: DEC)
					}
					p22{
					bytes{
						underload
						soft_limit
						hard_limit
					}
					gas{
						underload
						soft_limit
						hard_limit
					}
					lt_delta{
						underload
						soft_limit
						hard_limit
					}
				}
				p23{
					bytes{
						underload
						soft_limit
						hard_limit
					}
					gas{
						underload
						soft_limit
						hard_limit
					}
					lt_delta{
						underload
						soft_limit
						hard_limit
					}
				}
				p24{
					lump_price(format:DEC)
					bit_price(format:DEC)
					cell_price(format:DEC)
					ihr_price_factor
					first_frac
					next_frac
				}
				p25{
					lump_price(format:DEC)
					bit_price(format:DEC)
					cell_price(format:DEC)
					ihr_price_factor
					first_frac
					next_frac
				}
				p28{
					mc_catchain_lifetime
					shard_catchain_lifetime
					shard_validators_lifetime
					shard_validators_num
				}
				p29{
					round_candidates
					next_candidate_delay_ms
					consensus_timeout_ms
					fast_attempts
					attempt_duration
					catchain_max_deps
					max_block_bytes
					max_collated_bytes
				}
					p31
				}
			}
		}
	}`
}

export function getShardHashesQuery() {
	return `query {
		blockchain{
			blocks( last:1){
				edges {
					node {
						master {
							shard_hashes {
								workchain_id
								shard
								descr {
									gen_utime
								}
							}
						}
					}
				}
			}
		}
	}`
}

export function getTransactionsCountQuery() {
	return `query(
		$startTime: Float, 
		$endTime: Float,
		$minBalanceDelta: String,
		$maxBalanceDelta: String,
		$workchain: Int
	) {
		aggregateTransactions(
			filter: {
			now: {
					ge: $startTime
					le: $endTime
			}
			balance_delta: {
					ge: $minBalanceDelta
					le: $maxBalanceDelta
			}
			workchain_id:{eq: $workchain}
			}
		)
	}`
}
