import { useState } from "react";
import { type OwnedNft } from "alchemy-sdk";
import { AnimatePresence } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Alchemy, Network, NftFilters } from "alchemy-sdk";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import NFTCard from "./NFTCard";
import NFTModal from "./NFTModal";
import LoadingCard from "./LoadingCard";

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const NFTList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<OwnedNft | undefined>(
    undefined
  );
  const router = useRouter();
  const { username } = router.query;

  const { isLoading: isNFTDataLoading, data: nftData } = useQuery({
    queryKey: ["getNftsForOwner"],
    queryFn: async () => {
      const data = await alchemy.nft.getNftsForOwner(username as string, {
        omitMetadata: false,
        excludeFilters: [NftFilters.SPAM, NftFilters.AIRDROPS],
      });
      return data.ownedNfts.filter(
        (nft) =>
          nft.metadataError === undefined &&
          nft.rawMetadata?.image !== undefined
      );
    },
    enabled: !!username,
    refetchOnWindowFocus: false,
  });
  // console.log(nftData);

  return (
    <div className="mx-aut">
      <ul className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
        {isNFTDataLoading
          ? [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <li key={i}>
                <LoadingCard />
              </li>
            ))
          : nftData &&
            nftData.map((nft) => (
              <li
                key={
                  nft.title +
                  nft.tokenId +
                  Math.random().toString() +
                  Math.random().toString()
                }
                onClick={() => {
                  setSelectedNFT(nft);
                  setShowModal(true);
                }}
              >
                <NFTCard nft={nft} />
              </li>
            ))}
      </ul>
      <AnimatePresence>
        {showModal && selectedNFT && (
          <NFTModal setOpen={setShowModal} nft={selectedNFT} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default NFTList;
