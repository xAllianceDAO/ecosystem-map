import { CategoryType } from '@/types/project';

export enum Category {
    defi = 'defi',
    tool = 'tool',
    ai = 'ai',
    marketplace = 'marketplace',
    nft = 'nft',
    gaming = 'gaming',
    startup = 'startup',
    meme = 'meme',
    development = 'development',
    media = 'media',
    staking = 'staking',
}

export const categories: CategoryType[] = [
    {
        id: Category.defi,
        name: 'DeFi',
    },
    {
        id: Category.tool,
        name: 'Tools',
    },
    {
        id: Category.ai,
        name: 'AI',
    },
    {
        id: Category.marketplace,
        name: 'NFT Marketplaces',
    },
    {
        id: Category.nft,
        name: 'NFTs',
    },
    {
        id: Category.gaming,
        name: 'Gaming',
    },
    {
        id: Category.startup,
        name: 'Startups',
    },
    {
        id: Category.meme,
        name: 'Memes',
    },
    {
        id: Category.development,
        name: 'Development',
    },
    {
        id: Category.media,
        name: 'Media Presence',
    },
    {
        id: Category.staking,
        name: 'Staking Agencies',
    },
];
