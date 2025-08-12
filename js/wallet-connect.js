// wallet-connect.js - MetaMask připojení s podporou jazyků podle atributu lang v <html>

const lang = document.documentElement.lang || 'cs';

const texts = {
  metamask_connected: {
    cs: 'MetaMask připojena: ',
    en: 'MetaMask connected: '
  },
  metamask_error: {
    cs: 'MetaMask připojení zrušeno nebo chyba',
    en: 'MetaMask connection canceled or error'
  },
  metamask_not_installed: {
    cs: 'MetaMask není nainstalována.',
    en: 'MetaMask is not installed.'
  }
};

function setStatus(key, extra = '') {
  const status = document.getElementById('walletStatus');
  if (!status) return;
  const message = texts[key] ? texts[key][lang] + extra : extra;
  status.textContent = message;
}

async function connectMetaMask() {
  if (window.ethereum && window.ethereum.isMetaMask) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setStatus('metamask_connected', accounts[0]);
    } catch (error) {
      setStatus('metamask_error');
      console.error(error);
    }
  } else {
    setStatus('metamask_not_installed');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const btnMetaMask = document.getElementById('connectMetaMask');
  if (btnMetaMask) btnMetaMask.addEventListener('click', connectMetaMask);

  // Skryjeme tlačítka ostatních peněženek, protože nejsou podporovány bez SDK
  const btnWalletConnect = document.getElementById('connectWalletConnect');
  if (btnWalletConnect) btnWalletConnect.style.display = 'none';

  const btnCoinbaseWallet = document.getElementById('connectCoinbaseWallet');
  if (btnCoinbaseWallet) btnCoinbaseWallet.style.display = 'none';
});
