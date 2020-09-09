export default ({ store }, inject) => {
    inject('onConnect', async () => {
        return new Promise((resolve, reject) => {
            let timer = setInterval(async () => {
                if(window.ethereum) {
                    window.ethereum.on('accountsChanged', function (accounts) {
                        console.log("accountsChanged", window.ethereum.selectedAddress)
                        store.commit('updateConnectedAccount', accounts[0]);
                        store.commit('updateChainId', window.web3.toBigNumber(window.ethereum.chainId).toNumber());
                    });
                    if(!window.web3.eth.defaultAccount) {
                        await window.ethereum.enable();
                    }
                    store.commit('updateConnectedAccount', window.ethereum.selectedAddress);
                    store.commit('updateChainId', window.web3.toBigNumber(window.ethereum.chainId).toNumber());
                    clearInterval(timer)
                    resolve()
                }
            }, 10);
        });
    })
}
