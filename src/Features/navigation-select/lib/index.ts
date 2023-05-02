import { internalLinks } from "Entities/web"


export const links = [
	{ hash: internalLinks.blocks, id: 0, category: 'blockchain', translateSign: 'blocks' },
	{ hash: internalLinks.messages, id: 1, category: 'blockchain', translateSign: 'messages' },
	{ hash: internalLinks.transactions, id: 2, category: 'blockchain', translateSign: 'transactions' },
	{ hash: internalLinks.zeroState, id: 3, category: 'blockchain', translateSign: 'zero' },
	{ hash: internalLinks.accounts, id: 4, category: 'contracts', translateSign: 'accounts' },
	{ hash: internalLinks.contracts, id: 5, category: 'contracts', translateSign: 'smart_contaracts' },
	{ hash: internalLinks.tip3, id: 6, category: 'contracts', translateSign: 'tip3' },
	{ hash: internalLinks.KWT, id: 7, category: 'contracts', translateSign: 'KWT' },
	{ hash: internalLinks.nft, id: 8, category: 'contracts', translateSign: 'NFT' },
	{ hash: internalLinks.validators, id: 9, category: 'staking', translateSign: 'validators' },
	{ hash: internalLinks.depools, id: 10, category: 'staking', translateSign: 'depools' },
	{ hash: internalLinks.main, id: 11, category: 'none', translateSign: 'Main page' },
]