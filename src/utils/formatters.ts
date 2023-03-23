export const formatAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

export const formatXP = (xp: number) => {
  if (xp < 1000) {
    return xp;
  } else if (xp < 1000000) {
    return `${(xp / 1000).toFixed(0)}K`;
  } else {
    return `${(xp / 1000000).toFixed(0)}M`;
  }
};
