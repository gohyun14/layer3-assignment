import { Tab } from "@headlessui/react";
import { motion } from "framer-motion";
import { useState } from "react";

import NFTList from "../NFT/NFTList";
import TransactionList from "./TransactionList";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type ProfileTabsProps = {
  address: string;
};

const ProfileTabs = ({ address }: ProfileTabsProps) => {
  const [tabs] = useState({
    Transactions: () => <TransactionList address={address} />,
    NFTs: () => <NFTList />,
  });

  return (
    <div className="mt-10">
      <Tab.Group>
        <Tab.List className="relative flex flex-row justify-center gap-x-8 text-lg sm:gap-x-24">
          {Object.keys(tabs).map((title) => (
            <Tab
              key={title}
              className={({ selected }) =>
                classNames(
                  "relative px-2 focus:outline-none",
                  selected ? "" : ""
                )
              }
            >
              {({ selected }) => (
                // position: absolute;
                // bottom: -1px;
                // left: 0;
                // right: 0;
                // height: 1px;
                // background: var(--accent);
                <div>
                  {title}
                  {selected ? (
                    <motion.div
                      className="absolute left-0 h-[3px] w-full rounded-md bg-yellow-400"
                      layoutId="underline"
                    />
                  ) : null}
                </div>
              )}
            </Tab>
          ))}
          <div className="absolute -bottom-[2px] -z-10 h-[1px] w-[calc(100%_-_2rem)] rounded-md bg-gray-700 bg-opacity-70" />
        </Tab.List>
        <Tab.Panels className="mt-3">
          {Object.values(tabs).map((content, idx) => (
            <Tab.Panel key={idx} className={classNames("rounded-xl p-3", "")}>
              <ul>{content()}</ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ProfileTabs;
