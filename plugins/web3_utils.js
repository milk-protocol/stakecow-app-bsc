export default ({ store }, inject) => {
    inject('onConnect', async () => {
        return new Promise((resolve, reject) => {
            let count = 0;
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
                    window.ethereum.request({ method: "eth_requestAccounts" }).then(accounts => {
                      store.commit('updateConnectedAccount', accounts[0]);
                      let chainId = parseInt(window.ethereum.chainId, 16);
                      store.commit('updateChainId', chainId);
                      clearInterval(timer)
                      resolve()
                    }).catch(err => {
                        clearInterval(timer)
                        reject(err)
                    });
                } else{
                    count += 1;
                    if(count > 20){
                        clearInterval(timer);
                        reject("timeout")
                    }
                }
            }, 50);
        });
    })
}
