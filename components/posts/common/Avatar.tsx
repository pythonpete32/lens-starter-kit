interface Props {
  avatar?: string;
}

export function Avatar({ avatar }: Props) {
  return (
    <div className="avatar">
      <div className="w-14 rounded-full ring-2 ring-opacity-80 ring-primary ring-offset-base-100 ring-offset-1">
        <img src={avatar || 'https://avatars.dicebear.com/api/adventurer/mejsjdirbfldspafdfnr.svg'} />
      </div>
    </div>
  );
}
