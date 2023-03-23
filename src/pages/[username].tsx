import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserData, type UserType } from "~/pages/index";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import UserProfile from "~/components/user/UserProfile";

const UserPage: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isFetchingUser = useIsFetching({ queryKey: ["getUserData"] });

  const [user, setUser] = useState<UserType | undefined>(undefined);
  useEffect(() => {
    if (router.query.username) {
      // check cache for user data, query if it does not exist, set correct user
      const fetchUsersData = async () => {
        return (
          (queryClient.getQueryData(["getUserData"]) as Promise<UserType[]>) ??
          (await queryClient.fetchQuery({
            queryKey: ["getUserData"],
            queryFn: () => getUserData(),
          }))
        );
      };
      fetchUsersData()
        .then((users) => {
          setUser(
            users?.find((user) => user.username === router.query.username)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [queryClient, router.query.username]);

  return (
    <>
      <Head>
        <title>
          {router.query.username ? router.query.username : "User Details"}
        </title>
        <meta name="description" content="Layer3 User Leaderboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto my-10 max-w-4xl sm:mt-20">
          <UserProfile user={user} isFetching={isFetchingUser} />
        </div>
        <div className="fixed bottom-2 left-1/2 -translate-x-1/2 sm:bottom-4 sm:left-4 sm:transform-none">
          <Link href="/">
            <motion.button
              type="button"
              className="flex flex-row items-center gap-x-1 rounded-md bg-yellow-300 py-2.5 px-3.5 text-base font-semibold text-black hover:bg-yellow-400"
              whileTap={{
                scale: 0.9,
                borderRadius: "8px",
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 8,
                mass: 0.5,
              }}
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-[3]" />
              Leaderboard
            </motion.button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default UserPage;
