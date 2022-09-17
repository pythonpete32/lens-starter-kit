interface Props {
  userName: string;
  handle: string;
  status?: string;
}

export function User({ handle, userName, status }: Props) {
  return (
    <>
      <div className='flex justify-between'>
        <div className="text-2xl font-bold">{userName}</div>
        {status && <div className="text-xl">Status</div>}
      </div>
      <div className='flex justify-start'>
        <div className="text-xl font-bold">{handle}</div>
      </div>
    </>
  );
}
