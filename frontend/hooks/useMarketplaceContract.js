import { useContract, useSigner } from "wagmi";
import Marketplaceabi from "../abi/Marketplaceabi.json"

const useMarketplaceContract = () => {
    try {
        const { data: signer, isError, isLoading } = useSigner()
        const marketplaceContract = useContract({
            address: '0xc49e0E80aF12a0937881461609b6EFFe3fFb977B',
            abi: Marketplaceabi,
            signerOrProvider: signer,
          })
        return marketplaceContract;  
    }
    catch (error) {
        console.log(error);
        return
    }
}
export default useMarketplaceContract;