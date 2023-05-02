const internal = {
	blocks: '/blocks',
	messages: '/messages',
	transactions: '/transactions',
	zeroState: '/zeroState',
	accounts: '/accounts',
	contracts: '/contracts',
	tip3: '/tip3',
	KWT: '/KWT',
	nft: '/nft',
	validators: '/validators',
	depools: '/depools',
	landing: '/landing',
	legal: '/legalNotes',
	main: '/'
}

const external = {
	everOSGetStarted: 'https://docs.everos.dev/ever-platform/products/evercloud/get-started',
	everOSAPI: 'https://docs.everos.dev/ever-sdk/reference/ever-os-api',
	everX: 'https://everx.dev/',
	everMainnet: 'https://ever.live',
	everDevnet: 'https://net.ever.live',
	everFLD: 'https://fld.ever.live',
	everRFLD: 'https://rfld.ever.live',
	everMainnetPlayground: 'https://ever-live-playground.web.app/?cluster=mainnet.evercloud.dev/480fe4ee5f3e45ac85e6aa70505dc8dc&network=main&isBlockChainApiQuery=true&query=query { blockchain { blocks( first: 25,) { edges { node { hash seq_no workchain_id shard gen_utime tr_count gen_software_version } cursor } pageInfo{ endCursor } } } }'
}
export { internal, external }