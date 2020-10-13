export default ({ store }, inject) => {
    inject('onConnect', async () => {
        return new Promise((resolve, reject) => {
            let timer = setInterval(async () => {
                if(window.ethereum) {
                    if(window.ethereum.on) {
                        window.ethereum.on('accountsChanged', function (accounts) {
                            store.commit('updateConnectedAccount', accounts[0]);
                            let chainId = parseInt(window.ethereum.chainId, 16);
                            store.commit('updateChainId', chainId);
                            if(/MathWallet/i.test(window.navigator.userAgent)){
                              store.commit('checkWallet', window.ethereum.isMathWallet);
                            }
                        });
                        window.ethereum.on("chainChanged", (chainId) => {
                          store.commit('updateChainId', parseInt(chainId, 16));
                        })
                    }
                    window.ethereum.request({ method: "eth_accounts" }).then(accounts => {
                      store.commit('updateConnectedAccount', accounts[0]);
                      let chainId = parseInt(window.ethereum.chainId, 16);
                      store.commit('updateChainId', chainId);
                      clearInterval(timer)
                      resolve()
                    });
                    
                    // if(!window.web3.eth.defaultAccount) {
                    //    window.ethereum.enable().then(accounts => {
                    //        store.commit('updateConnectedAccount', accounts[0]);
                    //        let chainId = window.web3.toBigNumber(window.ethereum.chainId).toNumber();
                    //        store.commit('updateChainId', chainId);
                    //        store.commit('checkWallet', window.ethereum.isMathWallet);
                    //        if(/MathWallet/i.test(window.navigator.userAgent)){
                    //           store.commit('checkWallet', window.ethereum.isMathWallet);
                    //        }
                    //    });
                    // }
                    // store.commit('updateConnectedAccount', window.web3.eth.defaultAccount);
                    // let chainId = window.web3.toBigNumber(window.ethereum.chainId).toNumber();
                    // store.commit('updateChainId', chainId);
                    // store.commit('checkWallet', window.ethereum.isMathWallet);
                    // if(/MathWallet/i.test(window.navigator.userAgent)){
                    //   store.commit('checkWallet', window.ethereum.isMathWallet);
                    // }
                } else{
                    clearInterval(timer);
                    reject()
                }
            }, 10);
        });
    })
}
