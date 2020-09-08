export default (context, inject) => {
    inject('onConnect', async () => {
        if(window.ethereum) {
            window.ethereum.on('accountsChanged', function (accounts) {
                inject('connectedAccount', accounts[0]);
                inject('chainId', web3.toBigNumber(window.ethereum.chainId).toNumber());
            });
            if(!window.web3.eth.defaultAccount) {
                await window.ethereum.enable();
            }
            window.connectedAccount = window.web3.eth.defaultAccount;
            inject('connectedAccount', window.connectedAccount);
            inject('chainId', web3.toBigNumber(window.ethereum.chainId).toNumber());
        }
    })
}
