# Contributing to our project

Thanks for your interest in this project.

## Submitting a contribution

1. If this is your first time contributing to the project, fork the repo by clicking on the `Fork` button in the top-right corner of the git repo page.
   This creates a copy of the repo under your GitHub account: `https://github.com/<YourGitUserName>/skillvalley-team7`

2. Git clone the your repo:

```
git clone https://github.com/<YourGitUserName>/skillvalley-team7
```

3. Create a new branch to work on:

```
cd skillvalley-team7
git checkout -b my_new_branch
```

4. Add https://github.com/suhaasya/skillvalley-team7 as your upstream:

```
git remote add upstream https://github.com/suhaasya/skillvalley-team7
```

5. Before you start working on the issue, plese make sure the local branch is up to date:

```
git fetch upstream
git rebase upstream/master
```

6. Work on issue

7. Once you are done with your work, track your changes and commit.

```
git add .
git commit -m "message about this PR"
```

Commit message example:

```
Headline

Body

Fixes: #1234

Signed-off-by: Full Name <email>
```

- The first line is the PR title. It should describe the change made. Please keep it short and simple.
- The body should include detailed information about your PR. You may want to include designs, rationale, and a brief explanation of what you have changed. Please keep it concise.

7. Push the change into your Git repo:

```
git push origin my_new_branch
```

8. We would like to encourage you to open a pull request early and use `Create draft pull request` option. This allows others to check the PR, get early feedback, and helps create a better end product.

9. Convert PR to `Ready for review` once the PR is ready.

## Contact

Suhas Khobragade - [@suhaasya](https://twitter.com/suhaasya) - suhaskhobragade19@gmail.com <br />
