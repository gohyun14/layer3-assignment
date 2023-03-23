import axios from "axios";

export type TransactionType = {
  type: "BASE" | "TOKEN" | "NFT";
  timeStamp: string;
  from: string;
  to: string;
  value: string;
  isError: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  tokenName?: string;
  tokenSymbol?: string;
};

export const getStandardTransactions = async (address: string) => {
  const link = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=20&sort=desc&apikey=${
    process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY as string
  }`;
  // eslint-disable-next-line
  const { data } = await axios.get(link);
  // console.log(data);
  // eslint-disable-next-line
  return data["result"]
    .filter((tx: TransactionType) => tx.isError === "0")
    .map((tx: TransactionType) => {
      return {
        type: "BASE",
        timeStamp: tx.timeStamp,
        from: tx.from,
        to: tx.to,
        value: tx.value,
        isError: tx.isError,
        gasPrice: tx.gasPrice,
        gasUsed: tx.gasUsed,
        hash: tx.hash,
      };
    }) as TransactionType[];
};

const getTokenTransactions = async (address: string) => {
  const link = `https://api.etherscan.io/api?module=account&action=tokennfttx&address=${address}&page=1&offset=20&startblock=0&endblock=99999999&sort=desc&apikey=${
    process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY as string
  }`;
  // eslint-disable-next-line
  const { data } = await axios.get(link);
  // console.log(data);
  // eslint-disable-next-line
  return data["result"].map((tx: TransactionType) => {
    return {
      type: "TOKEN",
      timeStamp: tx.timeStamp,
      from: tx.from,
      to: tx.to,
      value: tx.value,
      isError: "0",
      gasPrice: tx.gasPrice,
      gasUsed: tx.gasUsed,
      hash: tx.hash,
      tokenName: tx.tokenName,
      tokenSymbol: tx.tokenSymbol,
    };
  }) as TransactionType[];
};

export const getAllTransactions = async (address: string) => {
  const data = await Promise.all([
    getStandardTransactions(address),
    getTokenTransactions(address),
  ]);

  return data
    .flat()
    .sort((a, b) => {
      return Number(b.timeStamp) - Number(a.timeStamp);
    })
    .slice(0, 20);
};
