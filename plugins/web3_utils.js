
export default ({ store }, inject) => {
  inject('onConnect', async () => {

    function setupProvider(provider) {
      if(provider.on) {
        provider.on('accountsChanged', function (accounts) {
          store.commit('updateConnectedAccount', accounts[0]);
          let chainId = parseInt(provider.chainId, 16);
          store.commit('updateChainId', chainId);
        });
        provider.on("chainChanged", (chainId) => {
          store.commit('updateChainId', parseInt(chainId, 16));
        });
      }
    }
    return new Promise((resolve, reject) => {
        let count = 0;
        let timer = setInterval(async () => {
          if(window.ethereum || window.BinanceChain) {
            clearInterval(timer)
            window.detectProvider = window.ethereum || window.BinanceChain;
            setupProvider(window.detectProvider);
            try {
              let accounts = await window.detectProvider.request({ method: "eth_requestAccounts" })
              if(accounts[0] != "") {
                store.commit('updateConnectedAccount', accounts[0]);
                store.commit('updateChainId', parseInt(window.detectProvider.chainId, 16));
                resolve()
              } else {
                reject(new Error('Error: User rejected the signature request'))
              }
            }catch(err) {
              reject(err)
            }
          } else {
            count += 1;
            if(count > 20) {
              clearInterval(timer)
              reject("timeout")
            }
          }
        }, 50);
    });
  })
}
