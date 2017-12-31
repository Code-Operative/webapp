import Injectable from 'utils/injectable';

class ListItemController extends Injectable {
  constructor(...injections) {
    super(ListItemController.$inject, injections);
  }

  getMarkerClass() {
    const prefix = 'style--';

    switch (this.post.type) {
      case 'audio':
        return `${prefix}audio`;

      case 'image':
        return `${prefix}image`;

      case 'page':
        return `${prefix}page`;

      case 'poll':
        return `${prefix}poll`;

      case 'text':
        return `${prefix}text`;

      case 'video':
        return `${prefix}video`;

      default:
        return '';
    }
  }

  getOriginalBranches() {
    let branches = [];

    if (this.post.data && this.post.data.original_branches) {
      branches = JSON.parse(this.post.data.original_branches);
    }

    return branches;
  }

  getOriginalBranchesTooltipString() {
    const originalBranches = this.getOriginalBranches();
    let string = '';

    for (let i = 1; i < originalBranches.length; i += 1) {
      string += originalBranches[i] + (i < originalBranches.length ? '\n' : '');
    }

    return string;
  }

  getPostImage() {
    const IMG_DIR = '/assets/images/placeholders/';
    return this.post.profileUrlThumb || `${IMG_DIR}post--${this.post.type}.svg`;
  }

  getTotalFlagCount() {
    const counts = [
      'branch_rules_count',
      'nsfw_count',
      'site_rules_count',
      'wrong_type_count',
    ];

    let total = 0;

    counts.forEach(key => {
      if (this.post[key]) {
        total += (Number.isNaN(this.post[key]) ? 0 : this.post[key]);
      }
    });

    return total;
  }

  isOwnPost() {
    return this.post && this.post.data && this.UserService.user.username === this.post.data.creator;
  }

  openDeletePostModal() {
    this.ModalService.open(
      'DELETE_POST',
      { postid: this.post.id },
      'Post deleted.',
      'Unable to delete post.',
    );

    this.EventService.on(this.EventService.events.MODAL_OK, name => {
      if (name !== 'DELETE_POST') return;
      this.$state.go(this.$state.current.name, { reload: true });
    });
  }

  openFlagPostModal() {
    this.ModalService.open(
      'FLAG_POST',
      {
        forceUpdate: false,
        post: this.post,
        branchid: this.BranchService.branch.id,
      },
      'Post flagged. The branch moderators will be informed.',
      'Unable to flag post.',
    );
  }

  openResolveFlagPostModal() {
    this.ModalService.open(
      'RESOLVE_FLAG_POST',
      { post: this.post },
      'Done.',
      'Error resolving flags on post.',
    );
  }

  showFlags() {
    return this.$state.current.name.includes('weco.branch.nucleus');
  }

  showVotes() {
    return !!this.stat;
  }

  vote(direction, iconNode) {
    this.PostService.vote(this.BranchService.branch.id, this.post.id, direction)
      .then(res => this.$timeout(() => {
        const delta = res.delta || 0;

        this.post.votes.individual += delta;
        this.post.votes.local += delta;
        this.post.votes.global += delta;

        if (this.post.votes.userVoted) {
          delete this.post.votes.userVoted;
        }
        else {
          this.post.votes.userVoted = direction;
        }

        if (iconNode) {
          if (direction === 'up') {
            if (delta > 0) {
              iconNode.classList.add('style--active');
            }
            else {
              iconNode.classList.remove('style--active');
            }
          }
        }
      }))
      .catch(err => {
        const {
          message,
          status,
        } = err;

        let error = '';

        switch (status) {
          case 400:
            error = 'Invalid request - there was an issue on our side!';
            break;

          case 403:
            error = 'Please log in or create an account to vote.';
            break;

          default:
            error = message;
            break;
        }

        this.AlertsService.push('error', error);
      });
  }
}

ListItemController.$inject = [
  '$state',
  '$timeout',
  'AlertsService',
  'AppService',
  'BranchService',
  'DateService',
  'EventService',
  'ModalService',
  'PostService',
  'UserService',
];

export default ListItemController;
