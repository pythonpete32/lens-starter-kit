import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'


const ConnectButton = dynamic(() => import('./WalletConnector'), {
  ssr: false,
})

export function Navbar() {
  return (
    <motion.div
      initial={{
        y: -100,
        opacity: 0,
        scale: 0.8,
        speed: 5
      }}
      transition={{
        delay: 0.2,
      }}
      animate={{
        y: 0,
        opacity: 1,
        scale: 1,
        speed: 5
      }}

      className="navbar bg-base-100"
    >
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">DAO Box 🗳️</a>
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered" />
        </div>
      </div>

      <div className="flex-none gap-2 px-2">
        <ConnectButton />
      </div>
    </motion.div>
  );
}
