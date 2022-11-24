import { ConnectButton } from '@rainbow-me/rainbowkit'

export function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">👨🏾‍🚀 BICO Starter</a>
      </div>

      <div className="flex-none gap-2 px-2">
        <ConnectButton />
      </div>
    </div>
  )
}
