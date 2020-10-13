import Cow from './cow';
import Erc20 from './erc20';
import Wbnb from './wbnb';
import Pair from './pair';
import Oracle from './oracle';
import Erc20Reader from './erc20_reader';
import CowReader from './cow_reader';
import LockPool from './lock_pool';
import CowHero from './cow_hero';
import HybirdCow from './hybird_cow';
import BNB from './bnb';
import Wallet from './wallet';
import CrBNB from './crbnb';

import config from  '~/config'
import Web3 from 'web3'

const web3Reader = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
const web3Writer = new Web3(window.ethereum);

const ZERO_ADDR = "0x0000000000000000000000000000000000000000";
const CREAM_BNB = "0x1ffe17b99b439be0afc831239ddecda2a790ff3a";
const BNB_MILK_LP = "0x6330c052e35f23ad219ad9afbaddf53a68f2b2b2";
export {
	Cow,
	Erc20,
	Wbnb,
	Pair,
	Oracle,
	Erc20Reader,
	CowReader,
	LockPool,
	CowHero,
	HybirdCow,
	BNB,
	Wallet,
	ZERO_ADDR,
	CREAM_BNB,
	CrBNB,
	web3Reader,
	web3Writer
}