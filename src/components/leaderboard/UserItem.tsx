import { FireIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import { type UserType } from "~/pages/index";
import { formatXP } from "~/utils/formatters";

const rankClassNames: string[] = [
  "bg-gray-700 font-light sm:bg-opacity-50",
  "bg-amber-400 border-2 border-yellow-200",
  "bg-gray-400 border-2 border-gray-200",
  "bg-amber-800 border-2 border-orange-400",
];

type UserItemProps = {
  user: UserType;
  idx: number;
};

const UserItem = ({ user, idx }: UserItemProps) => {
  return (
    <Link href={"/" + user.username + ""}>
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
        className="relative flex w-full flex-row items-center justify-between rounded-xl border border-gray-500 border-opacity-30 bg-gray-900 bg-opacity-80 py-3 px-5 transition-colors duration-300 hover:cursor-pointer hover:border-yellow-500 hover:border-opacity-90 sm:py-4 sm:px-7"
      >
        <div className="flex flex-row items-center">
          <div
            className={`absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full sm:relative sm:left-0 sm:top-0 sm:mr-6 sm:h-9 sm:w-9 ${
              user.rank < 4
                ? (rankClassNames[user.rank] as string)
                : (rankClassNames[0] as string)
            }`}
          >
            {user.rank}
          </div>
          {/* eslint-disable-next-line */}
          <img
            alt="User Avatar"
            src={`https://imgp.layer3cdn.com/cdn-cgi/image/fit=scale-down,width=88,anim=false,format=auto/ipfs/${user.avatarCid}`}
            className="mr-2 h-[3.25rem] w-[3.25rem] rounded-full"
          />
          <div>
            <span className="font-medium">{user.username}</span>
            <div className="mt-1 flex flex-row flex-wrap gap-x-1 gap-y-1 text-sm font-light">
              <span className="rounded-full bg-gray-700 bg-opacity-60 py-1 px-2">
                Level {user.level}
              </span>
              <span className="rounded-full bg-gray-700 bg-opacity-60 py-1 px-2">
                <FireIcon className="mr-1 inline-block h-4 w-4 text-orange-400" />
                {user.gmStreak} <span className="text-gray-400">gm streak</span>
              </span>
            </div>
          </div>
        </div>
        <div className="text-lg">
          <span className="mr-[3px] font-semibold">{formatXP(user.xp)}</span>
          <span className="font-medium text-gray-100 text-opacity-50">XP</span>
        </div>
      </motion.li>
    </Link>
  );
};

export default UserItem;
