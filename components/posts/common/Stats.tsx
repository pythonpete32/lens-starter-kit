interface Props {
  mirrors: string;
  likes: string;
}

export function Stats({ likes, mirrors }: Props) {
  return (
    <>
      <div className="divider"></div>
      <div className="flex space-x-6">
        <div className='flex space-x-1'>
          <span className="text-lg text-neutral-content font-md font-semibold">{mirrors}</span>
          <div className="text-lg text-neutral-content text-opacity-60 font-md">
            Mirrors
          </div>
        </div>
        <div className='flex space-x-1'>
          <span className="text-lg text-neutral-content font-md font-semibold">{likes}</span>
          <div className="text-lg text-neutral-content text-opacity-60 font-md">
            Likes
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </>
  );
}
