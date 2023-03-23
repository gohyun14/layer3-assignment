import { useState, useEffect } from "react";
import { type UserType } from "~/pages/index";
import { LayoutGroup, motion } from "framer-motion";
import { useRouter } from "next/router";

import UserItem from "./UserItem";

const sortButtons: { name: string; value: string }[] = [
  { name: "Rank", value: "rank" },
  { name: "Name", value: "name" },
  { name: "GM Streak", value: "gmStreak" },
];

type LeaderboardProps = {
  users: UserType[] | undefined;
  isLoading: boolean;
};

const Leaderboard = ({ users, isLoading }: LeaderboardProps) => {
  const router = useRouter();

  const [sortedUsers, setSortedUsers] = useState<UserType[] | undefined>(
    undefined
  );

  // sort users
  useEffect(() => {
    if (users && router.query.sort) {
      const sort = router.query.sort;
      setSortedUsers([
        ...users.sort((a, b) => {
          if (sort === "rank") {
            return a.rank - b.rank;
          } else if (sort === "name") {
            return a.username.localeCompare(b.username);
          } else if (sort === "gmStreak") {
            return b.gmStreak - a.gmStreak;
          } else {
            return 0;
          }
        }),
      ]);
    } else {
      setSortedUsers(users);
    }
  }, [router.query.sort, users]);

  return (
    <div>
      <header>
        <h1 className="text-4xl font-semibold">Layer3 Leaderboard</h1>
        <h2 className="font-base mt-2 text-xl">
          The top users of Layer3 to date!
        </h2>
        <div className="mt-6">
          {sortButtons.map((button) => (
            <motion.button
              key={button.value}
              className={`${
                router.query.sort === button.value
                  ? "bg-yellow-300 text-black"
                  : "bg-gray-800"
              } mr-1 rounded-full px-4 py-2 text-sm font-medium sm:mr-2`}
              whileTap={{
                scale: 0.9,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
                mass: 0.1,
              }}
              onClick={() => {
                void router.push({
                  pathname: router.pathname,
                  query: { ...router.query, sort: button.value },
                });
              }}
            >
              {button.name}
            </motion.button>
          ))}
        </div>
      </header>
      {!isLoading ? (
        <LayoutGroup>
          <motion.ol className="mt-3 flex flex-col gap-y-3 sm:gap-y-4">
            {users?.map((user, idx) => (
              <UserItem key={user.address} user={user} idx={idx} />
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

export default Leaderboard;
