import { useQuery } from "@tanstack/react-query";
import { LayoutGroup, motion } from "framer-motion";
import { getAllTransactions } from "~/utils/etherscan";

import TransactionItem from "./TransactionItem";

type TransactionListProps = {
  address: string;
};

const TransactionList = ({ address }: TransactionListProps) => {
  // query for external chart data
  const { data: transactionData, isLoading } = useQuery({
    queryKey: ["getAllTransactions"],
    queryFn: () => getAllTransactions(address),
    refetchOnWindowFocus: false,
    // enabled: !!assetsData && assetsData.length > 0,
  });

  console.log(transactionData);

  return (
    <div>
      {!isLoading ? (
        <LayoutGroup>
          <motion.ol className="mt-3 flex flex-col gap-y-3 sm:gap-y-4">
            {transactionData?.map((transaction, idx) => (
              <TransactionItem
                key={idx}
                transaction={transaction}
                address={address}
                idx={idx}
              />
            ))}
          </motion.ol>
        </LayoutGroup>
      ) : (
        <ol className="mt-3 flex flex-col gap-y-3 sm:gap-y-4">
          {[0, 1, 2, 3, 4].map((_, idx) => (
            <li
              key={idx}
              className="h-[112px] w-full animate-pulse rounded-xl border border-gray-500 border-opacity-30 bg-gray-500 py-3 px-5 sm:h-[86px] sm:py-4 sm:px-7"
            />
          ))}
        </ol>
      )}
    </div>
  );
};

export default TransactionList;
