import { ProposalsButton } from './ProposalsButton';
import { MemberFeedButton } from './MemberFeedButton';
import { TrendingButton } from './TrendingButton';

export function FeedButtonLayout() {
  return (<div className='flex flex-start space-x-4 pt-6 p px-4'>
    <ProposalsButton></ProposalsButton>

    <MemberFeedButton></MemberFeedButton>

    <TrendingButton></TrendingButton>
  </div>);
}
