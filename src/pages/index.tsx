import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Leaderboard from "~/components/leaderboard/Leaderboard";

export type UserType = {
  rank: number;
  address: string;
  avatarCid: string;
  username: string;
  gmStreak: number;
  xp: number;
  level: number;
};

export const getUserData = async () => {
  //eslint-disable-next-line
  const { data } = await axios.get("https://layer3.xyz/api/assignment/users");
  //eslint-disable-next-line
  return data?.users as UserType[];
};

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router && router.query.sort === undefined) {
      void router.push({
        pathname: router.pathname,
        query: { ...router.query, sort: "rank" },
      });
    }
  });

  // query for user data
  const { data: userData, isLoading: isUserDataLoading } = useQuery({
    queryKey: ["getUserData"],
    queryFn: () => getUserData(),
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Head>
        <title>Leaderboard</title>
        <meta name="description" content="Layer3 User Leaderboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto my-10 max-w-2xl sm:mt-20">
          <Leaderboard users={userData} isLoading={isUserDataLoading} />
        </div>
      </main>
    </>
  );
};

export default Home;
