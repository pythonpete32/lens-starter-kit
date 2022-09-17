interface Props {
  time: string;
}

export function Timestamp({ time }: Props) {
  return (<div className="flex justify-start ">
    <div className="text-sm font-xs text-secondary-content">{time}</div>
  </div>);
}
