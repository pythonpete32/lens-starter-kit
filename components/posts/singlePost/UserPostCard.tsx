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
  avatar?: string;
  date: string;
  content: string;
  image?: string;
  likes?: string;
  comments?: string;
  mirrors?: string;
  collects?: string;
}

export function UserPostCard(props: Props) {

  return (
    <div className="card card-compact w-full bg-base-300 ring-2 ring-base-100 shadow-2xl p-4">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-1 items-center justify-center">
          <Avatar avatar={props.avatar} />
        </div>
        <div className="col-span-11">
          <User userName={props.userName} handle={props.handle} />
          <Article content={props.content} />
          <Timestamp time='08:36 PM · Sep 16, 2022' />
          <Stats likes={props.likes} mirrors={props.mirrors} />
          <div className='flex justify-between px-1'>
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



