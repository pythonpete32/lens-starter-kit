export function UserPostCard() {

  return (
    // create a card with max width of screen, a slight boarder, some shadow and margin, give it a text inpur and a button to post the status
    <div className="card card-compact w-full bg-base-300 shadow-2xl p-2">
      <div className="card-body">
        <div className='flex m-2'>
          <div className="flex w-1/12 h-14 justify-center items-center">
            <img
              src="https://ik.imagekit.io/lensterimg/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/bafkreidy7rjphmqfyjsof3rutrq4klxtb7ks6fyisc5w2zoqhur5tyjjwm"
              alt="profile picture"
              className="rounded-full w-12 h-12"

            />
          </div>
          <div className="flex w-11/12  h-7 justify-between items-center">

            {/* these must take up max width and be rows */}
            <div className='flex w-full justify-between'>
              <div className="flex px-2 text-lg font-normal ">
                Username
              </div>
              <div className='flex justify-end items-center px-2'>
                <p>2 hours ago</p>
              </div>
            </div>
            <div className="flex w-full">
              <div>
                @handle.lens
              </div>
            </div>
          </div>

        </div>

        {/* <div className="flex flex-row">
          <div className="w-10">
            <img src="https://picsum.photos/200" alt="profile picture" className="rounded-full" />
          </div>
          <div className="w-full">
            <div className="flex flex-row justify-between">

              <h4> username.lens</h4>
              <p className="text-xs text-neutral-content"> 1h ago</p>
            </div>
          </div>
        </div>
 */}

      </div>
    </div>
  );
}