import { createWalletClient, http, custom, createPublicClient } from 'https://esm.sh/viem';

// --- Somnia Mainnet ki jaankari ---
const somniaMainnet = {
    id: 5031,
    name: 'Somnia Mainnet',
    network: 'somnia-mainnet',
    nativeCurrency: { name: 'SOMI', symbol: 'SOMI', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://api.infra.mainnet.somnia.network/'] },
        public: { http: ['https://api.infra.mainnet.somnia.network/'] },
    },
    blockExplorers: {
        default: { name: 'Somnia Explorer', url: 'https://explorer.somnia.network' },
    },
};

// --- Contract ki saari jaankari yahan hai ---
const contractAddress = "0x20C2b255756d4F390ACD4C94ac1C4e0c5DCb380d";
const contractABI = [{"inputs":[{"internalType":"address","name":"initialOwner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721IncorrectOwner","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721InsufficientApproval","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC721InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"ERC721InvalidOperator","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721InvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC721InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC721InvalidSender","type":"error"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721NonexistentToken","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"string","name":"message","type":"string"}],"name":"GMSaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"TOTAL_STAGES","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"stage","type":"uint256"}],"name":"mintReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sayGM","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

export const walletState = {
    walletClient: null,
    publicClient: null,
    userAddress: null
};

export async function connectWallet(showMessage) {
    if (typeof window.ethereum === 'undefined') {
        showMessage("MetaMask Not Found", "Close", () => document.getElementById('message-box').style.display = 'none');
        return false;
    }

    walletState.walletClient = createWalletClient({
        chain: somniaMainnet,
        transport: custom(window.ethereum)
    });
    walletState.publicClient = createPublicClient({
        chain: somniaMainnet,
        transport: http()
    });

    try {
        const [address] = await walletState.walletClient.requestAddresses();
        walletState.userAddress = address;

        const chainId = await walletState.walletClient.getChainId();
        if (chainId !== somniaMainnet.id) {
            try {
                await walletState.walletClient.switchChain({ id: somniaMainnet.id });
            } catch (switchError) {
                // Agar network MetaMask mein nahi hai to add karne ka try karega
                if (switchError.code === 4902) {
                    try {
                        await walletState.walletClient.addChain({ chain: somniaMainnet });
                    } catch (addError) {
                         showMessage("Please Add Somnia Mainnet in MetaMask", "Close", () => document.getElementById('message-box').style.display = 'none');
                         return false;
                    }
                } else {
                    showMessage("Please Switch to Somnia Mainnet in MetaMask", "Close", () => document.getElementById('message-box').style.display = 'none');
                    return false;
                }
            }
        }
        return true;
    } catch (error) {
        console.error("Wallet connection failed:", error);
        showMessage("Wallet Connection Failed", "Close", () => document.getElementById('message-box').style.display = 'none');
        return false;
    }
}

export async function mintNFTReward(stage) {
    if (!walletState.walletClient || !walletState.userAddress) {
        alert("Wallet not connected. Please connect wallet again.");
        return false;
    }
    try {
        const { request } = await walletState.publicClient.simulateContract({
            address: contractAddress,
            abi: contractABI,
            functionName: 'mintReward',
            args: [BigInt(stage)], // stage ko BigInt mein convert kiya
            account: walletState.userAddress
        });
        const txHash = await walletState.walletClient.writeContract(request);
        await walletState.publicClient.waitForTransactionReceipt({ hash: txHash });
        return true;
    } catch (error) {
        console.error("NFT Minting failed:", error);
        alert("NFT Minting failed. Check console for details.");
        return false;
    }
}

// "GM" transaction ke liye function
export async function sayGMOnchain() {
    if (!walletState.walletClient || !walletState.userAddress) {
        alert("Please connect your wallet first to say GM!");
        return false;
    }
    try {
        const { request } = await walletState.publicClient.simulateContract({
            address: contractAddress,
            abi: contractABI,
            functionName: 'sayGM',
            account: walletState.userAddress
        });
        const txHash = await walletState.walletClient.writeContract(request);
        alert("GM transaction sent! Waiting for confirmation...");
        await walletState.publicClient.waitForTransactionReceipt({ hash: txHash });
        alert("GM Onchain Successful!");
        return true;
    } catch (error) {
        console.error("GM transaction failed:", error);
        alert("GM transaction failed. Check console for details.");
        return false;
    }
}

export function disconnectWallet() {
    console.log("Disconnecting wallet from app state.");
    walletState.walletClient = null;
    walletState.publicClient = null;
    walletState.userAddress = null;
}