
export default ({ store }, inject) => {
  inject('onConnect', async () => {

    function setupProvider(provider, callback) {
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
      provider.request({ method: "eth_requestAccounts" }).then(accounts => {
        store.commit('updateConnectedAccount', accounts[0]);
        let chainId = parseInt(provider.chainId, 16);
        store.commit('updateChainId', chainId);
      }).catch(e => {
        console.error(e)
      });
    }


    return new Promise((resolve, reject) => {
        let count = 0;
        let timer = setInterval(async () => {
          if(window.ethereum) {
            window.detectProvider = window.ethereum;
            setupProvider(window.ethereum);
            clearInterval(timer)
            resolve()
          } else if(window.BinanceChain) {
            window.detectProvider = window.BinanceChain;
            setupProvider(window.BinanceChain);
            clearInterval(timer)
            resolve()
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
