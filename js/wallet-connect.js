// Pomocná funkce na zobrazení stavu
function setStatus(message) {
  const status = document.getElementById('walletStatus');
  if (status) status.textContent = message;
}

// Připojení MetaMask
async function connectMetaMask() {
  if (window.ethereum && window.ethereum.isMetaMask) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setStatus('MetaMask připojena: ' + accounts[0]);
    } catch (error) {
      setStatus('MetaMask připojení zrušeno nebo chyba');
      console.error(error);
    }
  } else {
    setStatus('MetaMask není nainstalována.');
  }
}

// Připojení Trust Wallet přes WalletConnect
async function connectWalletConnect() {
  if (typeof WalletConnectProvider === 'undefined') {
    setStatus('WalletConnect SDK není dostupné. Přidej jej do HTML.');
    return;
  }

  const provider = new WalletConnectProvider.default({
    rpc: {
      56: "https://bsc-dataseed.binance.org/" // BSC mainnet RPC URL
    },
  });

  try {
    await provider.enable();
    setStatus('Trust Wallet (WalletConnect) připojena: ' + provider.accounts[0]);
  } catch (error) {
    setStatus('Chyba při připojení Trust Wallet');
    console.error(error);
  }
}

// Připojení Coinbase Wallet
async function connectCoinbaseWallet() {
  if (typeof CoinbaseWalletSDK === 'undefined') {
    setStatus('Coinbase Wallet SDK není dostupné. Přidej jej do HTML.');
    return;
  }

  const coinbaseWallet = new CoinbaseWalletSDK.default({
    appName: "USDt.z Stablecoin",
    darkMode: false
  });

  const provider = coinbaseWallet.makeWeb3Provider("https://bsc-dataseed.binance.org/", 56);

  try {
    await provider.request({ method: 'eth_requestAccounts' });
    setStatus('Coinbase Wallet připojena.');
  } catch (error) {
    setStatus('Chyba při připojení Coinbase Wallet');
    console.error(error);
  }
}

// Přidáme event listenery na tlačítka po načtení stránky
window.addEventListener('DOMContentLoaded', () => {
  const btnMetaMask = document.getElementById('connectMetaMask');
  if (btnMetaMask) btnMetaMask.addEventListener('click', connectMetaMask);

  const btnWalletConnect = document.getElementById('connectWalletConnect');
  if (btnWalletConnect) btnWalletConnect.addEventListener('click', connectWalletConnect);

  const btnCoinbaseWallet = document.getElementById('connectCoinbaseWallet');
  if (btnCoinbaseWallet) btnCoinbaseWallet.addEventListener('click', connectCoinbaseWallet);
});
