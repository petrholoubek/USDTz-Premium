// Konfigurace providerů peněženek pro web3modal
const providerOptions = {
  walletconnect: {
    package: window.WalletConnectProvider.default,
    options: {
      infuraId: "YOUR_INFURA_ID"  // můžeš použít i veřejný endpoint nebo vlastní
    }
  },
  coinbasewallet: {
    package: window.CoinbaseWalletSDK,
    options: {
      appName: "USDt.z Stablecoin",
      infuraId: "YOUR_INFURA_ID"
    }
  }
  // Přidat další providery, pokud chceš
};

let web3Modal;
let provider;
let signer;

async function init() {
  web3Modal = new window.Web3Modal.default({
    cacheProvider: false, // zvaž true, pokud chceš automatické připojení
    providerOptions,
    theme: "dark",
  });
  
  const btn = document.getElementById("btn-connect-wallet");
  btn.addEventListener("click", onConnect);
}

async function onConnect() {
  try {
    provider = await web3Modal.connect();

    // Převést na ethers provider
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    signer = ethersProvider.getSigner();

    const address = await signer.getAddress();
    alert("Připojeno: " + address);

    // Tady můžeš přidat další logiku po připojení, např. číst zůstatek, data apod.
  } catch (e) {
    console.log("Chyba připojení:", e);
  }
}

window.addEventListener("load", init);
