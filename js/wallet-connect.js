<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>MetaMask Connect Example</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 2rem;
      background: #fff;
      color: #222;
    }
    .btn {
      background-color: rgb(31,186,156);
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      transition: background-color 0.3s ease;
    }
    .btn:hover {
      background-color: #1eab91;
    }
    #walletStatus {
      margin-top: 1rem;
      color: #1eab91;
      font-weight: 600;
      min-height: 1.5rem;
    }
  </style>
</head>
<body>

  <button id="connectMetaMask" class="btn">
    <!-- Text tlačítka můžeš měnit podle jazyka, nebo nech fixed -->
    Připojit MetaMask
  </button>

  <div id="walletStatus"></div>

  <script>
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
    });
  </script>

</body>
</html>
