export function shortenAddress(addr: string | undefined) {
  if (!addr) return 
  return addr.slice(0,4)+'...'+addr.slice(addr.length-4, addr.length);
}
export function avatarIconFromAddress(account: string | undefined) {
  if (!account) return 
  return `${account?.slice(account.length-2, account.length-1)} ${account?.slice(account.length-1, account.length)}`
}