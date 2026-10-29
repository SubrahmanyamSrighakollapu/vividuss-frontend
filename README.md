# Vividuss frontend

Next.js 16 / React 19 / Puck / Clerk website builder and shared public renderer. Application files are at this repository root.

Backend: [vividuss-backend](https://github.com/SubrahmanyamSrighakollapu/vividuss-backend).

## Setup and verification

Use Node.js 24 and the committed lockfile:

```sh
npm ci
# Copy .env.example to .env.local and supply Clerk test keys/API origins.
npm run dev
```

```sh
npm test
npm run lint
npm run build
npm run test:render
```

`API_URL` is server-reachable; `NEXT_PUBLIC_API_URL` is browser-reachable and embedded at build time. Never commit real environment files. Backend source is not required to build this app. `test:render` requires installed Chrome and a completed build; it runs isolated shared views without backend/authentication access. `test:browser` requires configured apps, valid Clerk staging keys and disposable fixtures. Default tests do not write to a database. Known image warnings and credential-backed acceptance gates remain documented.

## Contracts and compatibility

`shared/website-contract` is included locally. Keep its files identical to the backend repo during contract releases. Generate changes with `node scripts/generate-component-contracts.cjs`, review/test them, then copy the reviewed files to the backend before coordinated deployment. Generate the inventory with `node scripts/generate-component-inventory.cjs`.

There are 57 Puck registrations (55 views plus two historical aliases). Preserve legacy sections and stored JSON; no automatic data conversion or customer-specific Next.js builds. See [split notes](docs/REPOSITORY_SPLIT.md) and [Milestone 2 report](docs/MILESTONE_2_REPORT.md). Historical reports reference monorepo paths; this README provides current commands.

Imported from monorepo commit `eb7a6b56526637af99ed7f57660df7bad59bec8e`, without historical Git objects or environment files. The original workspace/history remains preserved locally.

## Milestone 3 development

Publication integrity is implemented on the Milestone 3 development branch and remains disabled by default until separately approved schema/rollout gates pass. See [revision design](docs/PUBLICATION_REVISIONS.md), [API contracts](docs/PUBLICATION_API.md), [migration/rollout plan](docs/MILESTONE_3_ROLLOUT.md) and [verification report](docs/MILESTONE_3_REPORT.md). Backend migration artifacts belong to vividuss-backend; documentation copies in the frontend describe the paired system. Do not mix enabled and unversioned writer instances.
