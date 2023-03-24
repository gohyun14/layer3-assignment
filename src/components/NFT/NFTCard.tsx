import { NoSymbolIcon } from "@heroicons/react/24/outline";
import { type OwnedNft } from "alchemy-sdk";
import { useState } from "react";

type NFTCardProps = {
  nft: OwnedNft;
};

const NFTCard = ({ nft }: NFTCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group rounded-lg bg-gray-800 bg-opacity-70 p-1 hover:cursor-pointer hover:shadow-xl">
      {!imageError ? (
        <div className="flex max-h-48 w-full items-center justify-center overflow-hidden rounded-t-lg">
          {nft.media?.find((media) => media.format === "mp4") ? (
            <video width="320" height="240">
              <source src={nft.media[0]?.gateway} type="video/mp4" />
            </video>
          ) : (
            //eslint-disable-next-line
            <img
              src={
                nft.media?.length > 0
                  ? nft.media[0]?.gateway
                  : nft.rawMetadata?.image
              }
              onError={() => {
                setImageError(true);
              }}
              className="duration-200 motion-safe:group-hover:scale-105"
            />
          )}
        </div>
      ) : (
        <div className="flex h-48 w-48 flex-col items-center justify-center overflow-hidden rounded-t-lg">
          <NoSymbolIcon className="h-24 w-24 text-gray-500" />
          <div className=" text-sm text-gray-400">Image not found...</div>
        </div>
      )}
      <div className="py-2 px-1 text-white">
        {nft.title ? (
          <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold">
            {nft.title}
          </h1>
        ) : (
          <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold">
            {nft.tokenId}
          </h1>
        )}
        {nft.contract.openSea?.collectionName ? (
          <h2 className="overflow-hidden text-ellipsis whitespace-nowrap">
            {nft.contract.openSea?.collectionName}
          </h2>
        ) : (
          <h2 className="mt-3 h-6"></h2>
        )}
        {nft.contract.openSea?.floorPrice ? (
          <h3 className="mt-3 text-gray-400">
            Floor: {(nft.contract.openSea?.floorPrice).toFixed(3)} ETH
          </h3>
        ) : (
          <h3 className="mt-3 h-6"></h3>
        )}
      </div>
    </div>
  );
};

export default NFTCard;
