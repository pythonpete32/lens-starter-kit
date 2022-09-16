import dynamic from 'next/dynamic'

const ConnectButton = dynamic(() => import('./WalletConnector'), {
  ssr: false,
})

export function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">DAO Box 🗳️</a>
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered" />
        </div>
      </div>

      <div className="flex-none gap-2 px-2">
        <ConnectButton />
      </div>
    </div>
  );
}
