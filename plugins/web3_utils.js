export default ({ store }, inject) => {
    inject('onConnect', async () => {
        if(window.ethereum) {
            window.ethereum.on('accountsChanged', function (accounts) {
                store.commit('updateConnectedAccount', accounts[0]);
                store.commit('updateChainId', web3.toBigNumber(window.ethereum.chainId).toNumber());
            });
            if(!window.web3.eth.defaultAccount) {
                await window.ethereum.enable();
            }
            window.connectedAccount = window.web3.eth.defaultAccount;
            store.commit('updateConnectedAccount', window.connectedAccount);
            store.commit('updateChainId', web3.toBigNumber(window.ethereum.chainId).toNumber());
        }
    })
}
