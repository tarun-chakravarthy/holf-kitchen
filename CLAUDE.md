# holf-kitchen

## Branching convention

- `develop` is the work-in-progress branch. All day-to-day commits (features,
  fixes, chores) land here first.
- `main` is the stable/default branch. Changes reach it only via a pull
  request from `develop` (opened manually or by CI), never by pushing to
  `main` directly.

When starting new work in this repo, branch from `develop` (or commit
directly to `develop` for small changes), then open a PR into `main` when
the change is ready to ship.

## Stack

Kitchen Stock Sheet is a Vite + React + TypeScript app. See `README.md` for
setup and build commands.
