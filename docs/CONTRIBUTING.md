# Contributing Guide

- [Pull Request Guidelines](#pull-request-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)

## Pull Request Guidelines

### Submitting a Pull Request (PR)

#### Keep it Small

Try to only fix one issue or add one feature within the pull request. In general, the right size for
a PR is **one self-contained change**. If a PR makes substantive changes to more than ~5 files, or
took longer than 1–2 days to write, or would take more than 20 minutes to review, consider splitting
it into multiple self-contained PRs. For example, a developer can submit one change that defines the
API for a new feature in terms of interfaces and documentation, and a second change that adds
implementations for those interfaces. For complex changes that should merge into the mainline branch
as a single unit but are too large to fit into one reasonable pull request, consider a stacked pull
request model: Create a primary branch `feature/big-feature` and a number of secondary branches
(e.g., `feature/big-feature-api`, `feature/big-feature-testing`, etc.) that each encapsulates a
subset of the functionality and that get individually code-reviewed against the
`feature/big-feature` branch. Once all secondary branches are merged into `feature/big-feature`,
create a pull request for merging the latter into the main branch.

It’s usually best to do refactorings in a separate PR from feature changes or bug fixes. For
example, moving and renaming a class should be in a different PR from fixing a bug in that class. It
is much easier for reviewers to understand the changes introduced by each PR when they are separate.

Small cleanups such as fixing a local variable name can be included inside of a feature change or
bug fix PR. It’s up to the judgment of developers and reviewers to decide when a refactoring is so
large that it will make the review more difficult if included in your current PR.

If you can rebase up a large PR into multiple smaller PRs, then do so. **Note that reviewers have
the discretion to reject your change outright for the sole reason of it being too large.** It can be
a lot of work to split up a change after you’ve already written it, or require lots of time arguing
about why the reviewer should accept your large change. It’s easier to just write small PRs in the
first place.

#### Be Descriptive

A PR description is essential to help the reviewers obtain the necessary context. The description
should be informative. It might include a brief description of the problem that’s being solved, and
why this is the best approach. If there are any shortcomings to the approach, they should be
mentioned. If relevant, include background information such as relevant issues and user stories,
benchmark results, and links to design documents.

The title of the PR should follow the [Commit Message Guidelines](#commit-message-guidelines). It
should summarize the PR in the imperative form.

Even small PRs deserve a little attention to detail. Put the PR in context.

It can also be helpful to open a
[draft pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests#draft-pull-requests)
at the start of the development to document first and lay down the tasks with a checklist.

#### Self Review and Test

Only submit to review **complete, self-reviewed (by diff), and self-tested PRs**. In order to save
reviewers’ time, test the submitted changes (i.e., run the test suite) and make sure they pass all
builds as well as all tests and code quality checks, both locally and on the CI servers, before
assigning reviewers.

We recommend opening a
[draft pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests#draft-pull-requests)
to help you review your PR before assigning reviewers. If you find relevant, you can also drop some
comments to provide more context to reviewers.

#### Rebase Before You Make the PR, If Needed

Unless there is a good reason not to rebase – typically because more than one person has been
working on the branch – it is often a good idea to rebase your branch to tidy up before submitting
the PR.

Use `git rebase -i master # or other references, e.g., HEAD~5`

For example:

- Merge “oops, fix typo/bug” into their parent commit. There is no reason to create and solve a bug
  within the same PR unless there is educational value in highlighting them.
- Reword your commit messages for clarity. Once a PR is submitted, any rewording of commits will
  involve a rebase, which can then mess up the conversation in the PR.

### Reference

- [Google - Engineering Practices Documentation](https://google.github.io/eng-practices/)
- [Palantir - Code Review Best Practices](https://medium.com/palantir/code-review-best-practices-19e02780015f)
- [Mike Pountney - Pull Request Etiquette](https://gist.github.com/mikepea/863f63d6e37281e329f8)
- [Zalando - A Plea For Small Pull Requests](https://jobs.zalando.com/en/tech/blog/a-plea-for-small-pull-requests)
- [Code Review Research Blog Post Series](https://www.michaelagreiler.com/code-review-blog-post-series/)

## Commit Message Guidelines

Commit messages and PR titles must follow the
[Conventional Commits specification](https://www.conventionalcommits.org/). This leads to more
readable messages that are easy to follow when looking through the repository history.

Commit messages are automatically validated before a commit.

### Type

The type of commit must be one of the following:

- `feat`: a new feature
- `fix`: a bug fix
- `refactor`: a code change made to make it easier to understand and cheaper to modify without
  changing its external behavior
- `rewrite`: a re-implementation of an existing functionality
- `perf`: a code change that improves performance
- `docs`: documentation only changes
- `style`: changes that do not affect the meaning of the code
- `test`: adding missing tests or correcting existing tests
- `build`: changes that affect the build system or external dependencies (example scopes: `deps`,
  `typescript`, `ci`...)
- `config`: configuration changes (example scopes: `jest`, `package-json`, `eslint`)
- `chore`: maintenance tasks
- `revert`: a revert of a commit

### Scope

The scope could be anything specifying the area of the commit change. For example `deps`,
`typescript`, `readme`, etc.
