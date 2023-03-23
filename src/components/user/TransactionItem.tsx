import {
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
  FireIcon,
  CurrencyDollarIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { type TransactionType } from "~/utils/etherscan";
import { useRouter } from "next/router";
import { formatAddress } from "~/utils/formatters";

type TransactionItemProps = {
  transaction: TransactionType;
  address: string;
  idx: number;
};

const TransactionItem = ({
  transaction,
  address,
  idx,
}: TransactionItemProps) => {
  const router = useRouter();
  const username = router.query.username;

  const date = new Date(
    parseInt(transaction.timeStamp) * 1000
  ).toLocaleString();

  const gasUsed = (
    parseInt(transaction.gasPrice) * parseInt(transaction.gasUsed)
  )
    .toString()
    .slice(0);

  const baseTx = (
    <div className="flex flex-row flex-wrap items-center justify-center gap-x-1 gap-y-1  sm:justify-start sm:text-lg">
      <div className="flex flex-row items-center gap-x-2 rounded-full bg-gray-700 bg-opacity-60 py-1 px-3">
        <ArrowRightCircleIcon className="h-[24px] w-[24px] stroke-2 text-yellow-300" />
        <span>To: {formatAddress(transaction.to)}</span>
      </div>
      {parseInt(transaction.value) > 0 && (
        <div className="flex flex-row items-center gap-x-2 rounded-full bg-gray-700 bg-opacity-60 py-1 px-3">
          <CurrencyDollarIcon className="h-[24px] w-[24px] stroke-2 text-green-500" />
          <span>{`Value: 0.${parseInt(transaction.value)
            .toString()
            .charAt(0)} ETH`}</span>
        </div>
      )}
      <div className="flex flex-row items-center gap-x-2 rounded-full bg-gray-700 bg-opacity-60 py-1 px-3">
        <FireIcon className="h-[24px] w-[24px] stroke-2 text-orange-400" />
        <span>{`Gas: 0.0${gasUsed.charAt(0)} ETH`}</span>
      </div>
    </div>
  );

  const tokenTx = (
    <div className="flex flex-row flex-wrap items-center justify-center gap-x-1 gap-y-1 sm:justify-start sm:text-lg">
      {transaction.to === address.toLowerCase() ? (
        <div className="flex flex-row items-center gap-x-2 rounded-full bg-gray-700 bg-opacity-60 py-1 px-3">
          <PlusCircleIcon className="h-[24px] w-[24px] stroke-2 text-green-500" />
          <span>{`Received ${transaction.tokenSymbol as string}`}</span>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-x-2 rounded-full bg-gray-700 bg-opacity-60 py-1 px-3">
          <MinusCircleIcon className="h-[24px] w-[24px] stroke-2 text-red-500" />
          <span>{`Sent ${transaction.tokenSymbol as string}`}</span>
        </div>
      )}

      {transaction.to === address.toLowerCase() ? (
        <div className="flex flex-row items-center gap-x-2 rounded-full bg-gray-700 bg-opacity-60 py-1 px-3">
          <ArrowLeftCircleIcon className="h-[24px] w-[24px] stroke-2 text-yellow-300" />
          <span>From: {formatAddress(transaction.from)}</span>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-x-2 rounded-full bg-gray-700 bg-opacity-60 py-1 px-3">
          <ArrowRightCircleIcon className="h-[24px] w-[24px] stroke-2 text-yellow-300" />
          <span>To: {formatAddress(transaction.to)}</span>
        </div>
      )}

      <div className="flex flex-row items-center gap-x-2 rounded-full bg-gray-700 bg-opacity-60 py-1 px-3">
        <FireIcon className="h-[24px] w-[24px] stroke-2 text-orange-400" />
        <span>{`Gas: 0.0${gasUsed.charAt(0)} ETH`}</span>
      </div>
    </div>
  );

  return (
    <a href={`https://etherscan.io/tx/${transaction.hash}`} target="_blank">
      <motion.li
        layout
        variants={{
          hidden: (index) => ({ opacity: 0, y: -50 * index }),
          visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: { delay: index * 0.04 },
          }),
          removed: { opacity: 0 },
        }}
        initial="hidden"
        animate="visible"
        exit="removed"
        custom={idx}
        className="relative flex w-full flex-row flex-wrap items-center justify-center gap-y-1 rounded-xl border border-gray-500 border-opacity-30 bg-gray-900 bg-opacity-80 py-3 px-5 transition-colors duration-300 hover:cursor-pointer hover:border-yellow-500 hover:border-opacity-90 sm:justify-between sm:py-4 sm:px-7"
      >
        {transaction.type === "BASE"
          ? baseTx
          : transaction.type === "TOKEN"
          ? tokenTx
          : "NFT"}
        <div className="flex flex-row items-center gap-x-2 rounded-full bg-yellow-300 py-1 px-3 text-lg text-black">
          {transaction.type === "BASE"
            ? "Standard"
            : transaction.type === "TOKEN"
            ? "Token"
            : "NFT"}
        </div>
      </motion.li>
      <motion.div
        layout
        variants={{
          hidden: (index) => ({ opacity: 0, y: -50 * index }),
          visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: { delay: index * 0.04 },
          }),
          removed: { opacity: 0 },
        }}
        initial="hidden"
        animate="visible"
        exit="removed"
        custom={idx}
        className="mt-[2px] text-xs font-light text-gray-300"
      >
        {date}
      </motion.div>
    </a>
  );
};

export default TransactionItem;
