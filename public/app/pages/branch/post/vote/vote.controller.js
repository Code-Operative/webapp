import Injectable from 'utils/injectable';

class BranchPostVoteController extends Injectable {
  constructor(...injections) {
    super(BranchPostVoteController.$inject, injections);

    this.answers = [];
    this.selectedAnswerIndex = -1;
    this.controls = {
      sortBy: {
        items: ['DATE POSTED', 'VOTES'],
        selectedIndex: 0
      }
    };

    this.$scope.$watch(() => this.controls.sortBy.selectedIndex, () => { this.getPollAnswers(); });
  }

  selectAnswer(index) {
    this.selectedAnswerIndex = index;
  }

  getPollAnswers(lastAnswerId) {
    this.selectedAnswerIndex = -1;
    let sortBy;
    switch(this.controls.sortBy.items[this.controls.sortBy.selectedIndex]) {
      case 'DATE':
        sortBy = 'date';
        break;
      case 'VOTES':
        sortBy = 'votes';
        break;
      default:
        sortBy = 'date';
        break;
    }

    // fetch the poll answers
    this.PostService.getPollAnswers(this.PostService.post.id, sortBy, lastAnswerId).then((answers) => {
      this.$timeout(() => {
        // if lastAnswerId was specified we are fetching _more_ answers, so append them
        if(lastAnswerId) {
          this.answers = this.answers.concat(answers);
        } else {
          this.answers = answers;
        }
      });
    }).catch((err) => {
      if(err.status !== 404) {
        this.AlertsService.push('error', 'Error fetching poll answers.');
      }
    });
  }
}
BranchPostVoteController.$inject = ['$timeout', '$scope', 'PostService', 'AlertsService'];

export default BranchPostVoteController;
