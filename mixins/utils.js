function etherscanAddr(addr) {
  return `https://bscscan.com/address/${addr}`;
}

function etherscanTx(txid) {
  return `https://bscscan.com/tx/${txid}`;
}

function formatDate(str) {
  return str; //`${str.substr(0, 4)}/${str.substr(4, 2)}/${str.substr(6, 2)}`
}

function shortAddr(addr) {
	return addr.substr(0, 6) + '...' + addr.substr(-4)
}

export default {
  etherscanAddr,
  etherscanTx,
  formatDate,
  shortAddr
}