export function UserPostCard() {

  return (
    // create a card with max width of screen, a slight boarder, some shadow and margin, give it a text inpur and a button to post the status
    <div className="card card-compact w-full bg-base-300 shadow-2xl border  p-2">
      <div className="card-body">

        {/* create a grid with two columns  */}
        <div className="grid grid-cols-12 gap-2">
          {/* create a column for the user image */}
          <div className="col-span-1">
            <img className="rounded-full w-12 h-12" src="https://picsum.photos/200" alt="user" />
          </div>
          {/* create a column for the user name and status */}
          <div className="col-span-11">
            <div className='flex justify-between'>
              <div className="text-2xl font-bold">User Name</div>
              <div className="text-xl">Status</div>
            </div>
            <div className='flex justify-start'>
              <div className="text-xl font-bold">@handle.lens</div>
            </div>
            <div className="flex py-4">
              Some mark down text
            </div>
            <div className="flex justify-start py-4">
              <div className="text-sm font-xs text-secondary-content">08:36 PM · Sep 16, 2022 · Posted via Lenster</div>
            </div>
            {/* add a devider */}
            <div className="divider"></div>

            <div className="flex space-x-1">
              <div className="text-sm font-xs">
                likes
              </div>
              <span>3</span>
              <div className="text-sm font-xs">
                Collects
              </div>
              <span>3</span>
            </div>
            <div className="divider"></div>

          </div>
        </div>

      </div>
    </div>

  );
}


{/* <div className='flex m-2'>
          <div className="flex w-1/12 h-14 justify-center items-center">
            <img
              src="https://ik.imagekit.io/lensterimg/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/bafkreidy7rjphmqfyjsof3rutrq4klxtb7ks6fyisc5w2zoqhur5tyjjwm"
              alt="profile picture"
              className="rounded-full w-12 h-12"

            />
          </div>
          <div className="flex w-11/12  h-7 justify-between items-center">

            <div className='flex w-full justify-between'>
              <div className="flex px-2 text-lg font-normal ">
                Username
              </div>
              <div className='flex justify-end items-center px-2'>
                <p>2 hours ago</p>
              </div>
            </div> */}
{/* <div className="flex w-full">
              <div>
                @handle.lens
              </div>
            </div> */}