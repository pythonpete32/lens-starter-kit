import { Article } from "../common/Article";
import { Avatar } from "../common/Avatar";
import { CollectButton } from "../common/CollectButton";
import { CommentButton } from "../common/CommentButton";
import { LikeButton } from "../common/LikeButton";
import { MirrorButton } from "../common/MirrorButton";
import { OptionsButton } from "../common/OptionsButton";
import { Stats } from "../common/Stats";
import { Timestamp } from "../common/Timestamp";
import { User } from "../common/User";

interface Props {
  userName: string;
  handle: string;
  status: string;
  avatar: string;
  date: string;
  content: string;
  image?: string;
  likes?: number;
  comments?: number;
  mirrors?: number;
  collects?: number;
  position: 'TOP' | 'MIDDLE' | 'BOTTOM';
}

export function PostFeedComponent({ userName, handle, status, content, position, ...props }: Props) {

  const POSITION = {
    TOP: "card card-compact rounded-t-2xl rounded-b-none w-full bg-base-300 ring-2 ring-base-100 shadow-2xl p-6",
    MIDDLE: "card card-compact rounded-none w-full bg-base-300 ring-2 ring-base-100 shadow-2xl p-6",
    BOTTOM: "card card-compact rounded-t-none rounded-b-2xl w-full bg-base-300 ring-2 ring-base-100 shadow-2xl p-6",
  }

  return (
    <div className={POSITION[position]} >
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-1 items-center justify-center">
          <Avatar />
        </div>
        <div className="col-span-11">
          <User
            userName={userName}
            handle={handle}
            status={status}
          />
          <Article
            content={content}
          />

          <div className='flex justify-start space-x-8'>
            <CommentButton />
            <MirrorButton />
            <LikeButton />
            <CollectButton />
            <OptionsButton />
          </div>
        </div>
      </div>
    </div>
  );
}



