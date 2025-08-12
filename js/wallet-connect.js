// wallet-connect.js - jednoduché připojení pouze MetaMask bez dalších SDK

function setStatus(message) {
  const status = document.getElementById('walletStatus');
  if (status) status.textContent = message;
}

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

window.addEventListener('DOMContentLoaded', () => {
  const btnMetaMask = document.getElementById('connectMetaMask');
  if (btnMetaMask) btnMetaMask.addEventListener('click', connectMetaMask);

  // ostatní tlačítka skryjeme nebo deaktivujeme, protože nejsou podporována bez SDK
  const btnWalletConnect = document.getElementById('connectWalletConnect');
  if (btnWalletConnect) {
    btnWalletConnect.style.display = 'none'; // nebo btnWalletConnect.disabled = true;
  }
  const btnCoinbaseWallet = document.getElementById('connectCoinbaseWallet');
  if (btnCoinbaseWallet) {
    btnCoinbaseWallet.style.display = 'none'; // nebo btnCoinbaseWallet.disabled = true;
  }
});
