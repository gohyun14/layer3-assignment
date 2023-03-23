import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { type OwnedNft } from "alchemy-sdk";
import { motion } from "framer-motion";
import { useState } from "react";
import { NoSymbolIcon } from "@heroicons/react/24/outline";

import Modal from "~/components/UI/Modal";

type NFTModalProps = {
  nft: OwnedNft;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NFTModal = ({ nft, setOpen }: NFTModalProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Modal setOpen={setOpen}>
      <div className="max-w-xs rounded-lg text-white">
        {!imageError ? (
          <div className="h-full w-full overflow-hidden rounded-lg">
            <img
              src={
                nft.media?.length > 0
                  ? nft.media[0]?.gateway
                  : nft.rawMetadata?.image
              }
              onError={() => {
                setImageError(true);
              }}
            />
          </div>
        ) : (
          <div className="mx-auto mb-3 flex w-min flex-col overflow-hidden rounded-lg">
            <NoSymbolIcon className="h-44 w-44 text-gray-500" />
            <div className="text-gray-400">Image not found...</div>
          </div>
        )}
        <div className="mt-2 p-2">
          <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold">
            {nft.title}
          </h1>
          <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-light">
            {nft.contract.openSea?.collectionName}
          </h2>
          {nft.description && (
            <p className="mt-2 text-base line-clamp-4">{nft.description}</p>
          )}
        </div>
        <div className="mt-2 flex w-full flex-row justify-center">
          <a
            href={`https://opensea.io/assets/ethereum/${nft.contract.address}/${nft.tokenId}`}
            target="_blank"
          >
            <motion.button
              type="button"
              className="flex flex-row items-center gap-x-1 rounded-md bg-yellow-400 py-2.5 px-3.5 text-base font-medium text-black shadow-sm hover:bg-yellow-500"
              whileTap={{
                scale: 0.95,
                borderRadius: "8px",
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 8,
                mass: 0.5,
              }}
            >
              Buy NFT
              <ArrowUpRightIcon className="h-5 w-5 stroke-[2]" />
            </motion.button>
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default NFTModal;
