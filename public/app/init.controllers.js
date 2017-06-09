import App from './app.controller';
import Auth from './pages/auth/controller';
import Branch from './pages/branch/controller';
import BranchNucleusAbout from './pages/branch/nucleus/about/controller';
import BranchNucleus from './pages/branch/nucleus/controller';
import BranchNucleusFlaggedPosts from './pages/branch/nucleus/flagged-posts/controller';
import BranchNucleusModerators from './pages/branch/nucleus/moderators/controller';
import BranchNucleusModtools from './pages/branch/nucleus/modtools/controller';
import BranchNucleusSettings from './pages/branch/nucleus/settings/controller';
import BranchPost from './pages/branch/post/controller';
import BranchPostResults from './pages/branch/post/results/controller';
import BranchPostVote from './pages/branch/post/vote/controller';
import BranchSubbranches from './pages/branch/subbranches/controller';
import BranchWall from './pages/branch/wall/controller';
import Home from './pages/home/controller';
import Profile from './pages/profile/controller';
import ProfileNotifications from './pages/profile/notifications/controller';
import ProfileSettings from './pages/profile/settings/controller';
import ResetPassword from './pages/auth/reset-password/controller';
import Tooltip from './components/tooltip/controller';
import Verify from './pages/auth/verify/controller';

// Components.
import AddModModal from './components/modal/branch/nucleus/modtools/add-mod/controller';
import BranchNucleusSettingsModal from './components/modal/branch/nucleus/settings/controller';
import Comments from './components/comments/controller';
import CommentThread from './components/comments/comment-thread/controller';
import CoverPhoto from './components/cover-photo/controller';
import CreateBranchModal from './components/modal/branch/create/controller';
import CreatePostModal from './components/modal/post/create/controller';
import DeleteBranchModal from './components/modal/branch/nucleus/modtools/delete-branch/controller';
import DeletePostModal from './components/modal/post/delete/controller';
import FlagPostModal from './components/modal/post/flag/controller';
import ListItem from './components/list-item/controller';
import Navbar from './components/nav-bar/controller';
import ProfileSettingsModal from './components/modal/profile/settings/controller';
import RemoveModModal from './components/modal/branch/nucleus/modtools/remove-mod/controller';
import ResolveFlagPostModal from './components/modal/post/flag/resolve/controller';
import ReviewSubbranchRequestsModal from './components/modal/branch/nucleus/modtools/review-subbranch-requests/controller';
import SubmitPollAnswerModal from './components/modal/post/submit-poll-answer/controller';
import SubmitSubbranchRequestModal from './components/modal/branch/nucleus/modtools/submit-subbranch-request/controller';
import Tabs from './components/tabs/controller';
import UpdateHomepageStatsModal from './components/modal/branch/nucleus/modtools/update-homepage-stats/controller';
import UploadImageModal from './components/modal/upload-image/controller';
import WriteComment from './components/comments/write-comment/controller';

let refs = [
  { name: 'AppController', module: App },
  { name: 'AuthController', module: Auth },
  { name: 'BranchController', module: Branch },
  { name: 'BranchNucleusAboutController', module: BranchNucleusAbout },
  { name: 'BranchNucleusController', module: BranchNucleus },
  { name: 'BranchNucleusFlaggedPostsController', module: BranchNucleusFlaggedPosts },
  { name: 'BranchNucleusModeratorsController', module: BranchNucleusModerators },
  { name: 'BranchNucleusModtoolsController', module: BranchNucleusModtools },
  { name: 'BranchNucleusSettingsController', module: BranchNucleusSettings },
  { name: 'BranchPostController', module: BranchPost },
  { name: 'BranchPostResultsController', module: BranchPostResults },
  { name: 'BranchPostVoteController', module: BranchPostVote },
  { name: 'BranchSubbranchesController', module: BranchSubbranches },
  { name: 'BranchWallController', module: BranchWall },
  { name: 'HomeController', module: Home },
  { name: 'ProfileController', module: Profile },
  { name: 'ProfileNotificationsController', module: ProfileNotifications },
  { name: 'ProfileSettingsController', module: ProfileSettings },
  { name: 'ResetPasswordController', module: ResetPassword },
  { name: 'TooltipController', module: Tooltip },
  { name: 'VerifyController', module: Verify },
  
  { name: 'AddModModalController', module: AddModModal },
  { name: 'BranchNucleusSettingsModalController', module: BranchNucleusSettingsModal },
  { name: 'CommentsController', module: Comments },
  { name: 'CommentThreadController', module: CommentThread },
  { name: 'CoverPhotoController', module: CoverPhoto },
  { name: 'CreateBranchModalController', module: CreateBranchModal },
  { name: 'CreatePostModalController', module: CreatePostModal },
  { name: 'DeleteBranchModalController', module: DeleteBranchModal },
  { name: 'DeletePostModalController', module: DeletePostModal },
  { name: 'FlagPostModalController', module: FlagPostModal },
  { name: 'ListItemController', module: ListItem },
  { name: 'NavbarController', module: Navbar },
  { name: 'ProfileSettingsModalController', module: ProfileSettingsModal },
  { name: 'RemoveModModalController', module: RemoveModModal },
  { name: 'ResolveFlagPostModalController', module: ResolveFlagPostModal },
  { name: 'ReviewSubbranchRequestsModalController', module: ReviewSubbranchRequestsModal },
  { name: 'SubmitPollAnswerModalController', module: SubmitPollAnswerModal },
  { name: 'SubmitSubbranchRequestModalController', module: SubmitSubbranchRequestModal },
  { name: 'TabsController', module: Tabs },
  { name: 'UpdateHomepageStatsModalController', module: UpdateHomepageStatsModal },
  { name: 'UploadImageModalController', module: UploadImageModal },
  { name: 'WriteCommentController', module: WriteComment }
];

const controllers = (registrar) => {
  if (!registrar) throw new Error('Cannot register controllers - no registrar provided.');
  refs.forEach(ref => registrar.controller(ref.name, ref.module));
};

export default controllers;
