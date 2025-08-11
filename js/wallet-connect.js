// wallet-connect.js

// Import nebo načtení Web3Modal, WalletConnectProvider a CoinbaseWalletSDK přes CDN musí být v HTML
// Tj. v HTML <head> přidej:
// <script src="https://unpkg.com/web3modal@1.9.12/dist/index.js"></script>
// <script src="https://unpkg.com/@walletconnect/web3-provider@1.8.0/dist/umd/index.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/@coinbase/wallet-sdk@3.7.0/dist/CoinbaseWalletSDK.min.js"></script>

let web3Modal;
let provider;
let selectedAccount;

function setStatus(message) {
  const status = document.getElementById('walletStatus');
  if (status) status.textContent = message;
}

async function onConnect() {
  try {
    provider = await web3Modal.connect();

    provider.on("accountsChanged", (accounts) => {
      selectedAccount = accounts[0];
      setStatus("Účet změněn: " + selectedAccount);
    });

    provider.on("chainChanged", (chainId) => {
      setStatus("Řetězec změněn: " + chainId);
    });

    provider.on("disconnect", (code, reason) => {
      setStatus("Odpojeno: " + reason);
    });

    const accounts = await provider.request({ method: "eth_requestAccounts" });
    selectedAccount = accounts[0];
    setStatus("Připojeno: " + selectedAccount);
  } catch (e) {
    setStatus("Připojení zrušeno nebo chyba");
    console.error(e);
  }
}

async function onDisconnect() {
  if (provider && provider.close) {
    await provider.close();
  }
  await web3Modal.clearCachedProvider();
  provider = null;
  selectedAccount = null;
  setStatus("Odpojeno");
}

window.addEventListener('DOMContentLoaded', () => {
  const providerOptions = {
    walletconnect: {
      package: window.WalletConnectProvider.default,
      options: {
        rpc: {
          56: "https://bsc-dataseed.binance.org/" // BSC mainnet
        }
      }
    },
    coinbasewallet: {
      package: window.CoinbaseWalletSDK.default,
      options: {
        appName: "USDt.z Stablecoin",
        rpc: "https://bsc-dataseed.binance.org/",
        chainId: 56,
        darkMode: false
      }
    }
  };

  web3Modal = new window.Web3Modal.default({
    cacheProvider: false,
    providerOptions,
  });

  // Připojit tlačítko (můžeš upravit id v HTML)
  const btnConnect = document.getElementById('connectWallet');
  if (btnConnect) btnConnect.addEventListener('click', onConnect);

  const btnDisconnect = document.getElementById('disconnectWallet');
  if (btnDisconnect) btnDisconnect.addEventListener('click', onDisconnect);
});
