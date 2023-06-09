import { Chain, polygonMumbai } from "wagmi/chains";
import { stringToAddress } from "./converters";

/**
 * Help variables
 */
const mumbaiProfileContractAddress =
  process.env.NEXT_PUBLIC_MUMBAI_PROFILE_CONTRACT_ADDRESS;
const mumbaiChallengeContractAddress =
  process.env.NEXT_PUBLIC_MUMBAI_CHALLENGE_CONTRACT_ADDRESS;

const fiveIreTestnetProfileContractAddress =
  process.env.NEXT_PUBLIC_5IRE_TESTNET_PROFILE_CONTRACT_ADDRESS;
const fiveIreTestnetChallengeContractAddress =
  process.env.NEXT_PUBLIC_5IRE_TESTNET_CHALLENGE_CONTRACT_ADDRESS;

const mantleTestnetProfileContractAddress =
  process.env.NEXT_PUBLIC_MANTLE_TESTNET_PROFILE_CONTRACT_ADDRESS;
const mantleTestnetChallengeContractAddress =
  process.env.NEXT_PUBLIC_MANTLE_TESTNET_CHALLENGE_CONTRACT_ADDRESS;

const xdcTestnetProfileContractAddress =
  process.env.NEXT_PUBLIC_XDC_TESTNET_PROFILE_CONTRACT_ADDRESS;
const xdcTestnetChallengeContractAddress =
  process.env.NEXT_PUBLIC_XDC_TESTNET_CHALLENGE_CONTRACT_ADDRESS;

/**
 * Custom chains
 */
const fiveIreTestnetChain: Chain = {
  id: 997,
  name: "5ire Testnet",
  network: "5ire-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "5ire",
    symbol: "5ire",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.5ire.network"],
    },
    public: {
      http: ["https://rpc-testnet.5ire.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "5ire Testnet Explorer",
      url: "https://explorer.5ire.network",
    },
  },
};

const mantleTestnetChain: Chain = {
  id: 5001,
  name: "Mantle Testnet",
  network: "mantle-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "BIT",
    symbol: "BIT",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.mantle.xyz"],
    },
    public: {
      http: ["https://rpc.testnet.mantle.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "Mantle Testnet Explorer",
      url: "https://explorer.testnet.mantle.xyz",
    },
  },
};

const xdcTestnetChain: Chain = {
  id: 51,
  name: "XDC Apothem Testnet",
  network: "xdc-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "XDC",
    symbol: "XDC",
  },
  rpcUrls: {
    default: {
      http: ["https://erpc.apothem.network"],
    },
    public: {
      http: ["https://erpc.apothem.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "XDC Testnet Explorer",
      url: "https://explorer.apothem.network/",
    },
  },
};

/**
 * Get the first chain from supported chains.
 */
export function getDefaultChain(): Chain | undefined {
  const chains = getSupportedChains();
  if (chains.length !== 0) {
    return chains[0];
  } else {
    return undefined;
  }
}

/**
 * Get chains that defined in environment variables.
 */
export function getSupportedChains(): Array<Chain> {
  const chains: Array<Chain> = [];
  if (mumbaiChallengeContractAddress && mumbaiProfileContractAddress) {
    chains.push(polygonMumbai);
  }
  if (
    fiveIreTestnetChallengeContractAddress &&
    fiveIreTestnetProfileContractAddress
  ) {
    chains.push(fiveIreTestnetChain);
  }
  if (
    mantleTestnetChallengeContractAddress &&
    mantleTestnetProfileContractAddress
  ) {
    chains.push(mantleTestnetChain);
  }
  if (xdcTestnetChallengeContractAddress && xdcTestnetProfileContractAddress) {
    chains.push(xdcTestnetChain);
  }
  if (chains.length === 0) {
    console.error("Not found supported chains");
  }
  return chains;
}

/**
 * Get id of specified or default chain.
 */
export function getChainId(chain: Chain | undefined): number | undefined {
  if (chain === undefined) {
    chain = getDefaultChain();
  }
  return chain?.id;
}

/**
 * Get native currency symbol of specified or default chain.
 */
export function getChainNativeCurrencySymbol(
  chain: Chain | undefined
): string | undefined {
  if (chain === undefined) {
    chain = getDefaultChain();
  }
  return chain?.nativeCurrency?.symbol;
}

/**
 * Get address that defined in environment variables.
 */
export function getProfileContractAddress(
  chain: Chain | undefined
): `0x${string}` | undefined {
  if (chain === undefined) {
    chain = getDefaultChain();
  }
  if (chain?.id === polygonMumbai.id && mumbaiProfileContractAddress) {
    return stringToAddress(mumbaiProfileContractAddress);
  }
  if (
    chain?.id === fiveIreTestnetChain.id &&
    fiveIreTestnetProfileContractAddress
  ) {
    return stringToAddress(fiveIreTestnetProfileContractAddress);
  }
  if (
    chain?.id === mantleTestnetChain.id &&
    mantleTestnetProfileContractAddress
  ) {
    return stringToAddress(mantleTestnetProfileContractAddress);
  }
  if (chain?.id === xdcTestnetChain.id && xdcTestnetProfileContractAddress) {
    return stringToAddress(xdcTestnetProfileContractAddress);
  }
  console.error(`Not found profile contract address for chain: ${chain?.name}`);
  return undefined;
}

/**
 * Get address that defined in environment variables.
 */
export function getChallengeContractAddress(
  chain: Chain | undefined
): `0x${string}` | undefined {
  if (chain === undefined) {
    chain = getDefaultChain();
  }
  if (chain?.id === polygonMumbai.id && mumbaiChallengeContractAddress) {
    return stringToAddress(mumbaiChallengeContractAddress);
  }
  if (
    chain?.id === fiveIreTestnetChain.id &&
    fiveIreTestnetChallengeContractAddress
  ) {
    return stringToAddress(fiveIreTestnetChallengeContractAddress);
  }
  if (
    chain?.id === mantleTestnetChain.id &&
    mantleTestnetChallengeContractAddress
  ) {
    return stringToAddress(mantleTestnetChallengeContractAddress);
  }
  if (chain?.id === xdcTestnetChain.id && xdcTestnetChallengeContractAddress) {
    return stringToAddress(xdcTestnetChallengeContractAddress);
  }
  console.error(
    `Not found challenge contract address for chain: ${chain?.name}`
  );
  return undefined;
}
