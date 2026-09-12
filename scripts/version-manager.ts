/**
 * Sunya Visibility — Enterprise Git Version & Rollback Manager
 * Provides 1-click snapshotting, safety backups, downgrading, and upgrading.
 *
 * Usage:
 *   tsx scripts/version-manager.ts list
 *   tsx scripts/version-manager.ts snapshot [tag] [message]
 *   tsx scripts/version-manager.ts downgrade [tag]
 *   tsx scripts/version-manager.ts upgrade
 */

import { execSync } from 'child_process';

function run(cmd: string): string {
  try {
    return execSync(cmd, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch (err: any) {
    if (err.stderr) {
      throw new Error(err.stderr.toString().trim());
    }
    throw err;
  }
}

function getCurrentBranchOrTag(): string {
  try {
    const branch = run('git symbolic-ref --short -q HEAD');
    if (branch) return branch;
  } catch {
    // detached head
  }
  try {
    const tag = run('git describe --tags --exact-match HEAD');
    return `tag:${tag}`;
  } catch {
    return run('git rev-parse --short HEAD');
  }
}

function listVersions() {
  console.log('\n📦 [Sunya Visibility Version History]');
  console.log('======================================================================');

  const current = getCurrentBranchOrTag();
  console.log(`Currently on: \x1b[32m${current}\x1b[0m\n`);

  const tags = run('git tag -l --sort=-creatordate')
    .split('\n')
    .map((t) => t.trim())
    .filter(Boolean);

  if (tags.length === 0) {
    console.log('No tagged versions yet. Create one with: pnpm version:snapshot v1.0.0');
    return;
  }

  console.log('Available Versions for Downgrade / Upgrade:');
  for (const tag of tags) {
    try {
      const commit = run(`git rev-list -n 1 ${tag}`);
      const date = run(`git log -1 --format=%cd --date=format:"%Y-%m-%d %H:%M" ${commit}`);
      const msg =
        run(`git tag -l --format="%(contents:subject)" ${tag}`) ||
        run(`git log -1 --format=%s ${commit}`);
      const isCurrent = current === `tag:${tag}` || current === tag;
      const marker = isCurrent ? '👉 (CURRENT)' : '  ';
      console.log(`  ${marker} \x1b[36m${tag.padEnd(14)}\x1b[0m \x1b[90m[${date}]\x1b[0m ${msg}`);
    } catch {
      console.log(`  - ${tag}`);
    }
  }

  console.log('======================================================================\n');
  console.log('Commands:');
  console.log(
    '  • To Downgrade: pnpm version:downgrade <tag>  (e.g. pnpm version:downgrade v1.0.0)',
  );
  console.log('  • To Upgrade:   pnpm version:upgrade          (returns to latest main branch)\n');
}

function snapshotVersion(customTag?: string, message?: string) {
  console.log('\n📸 [Creating Version Snapshot]');

  // Check if working tree has changes
  const status = run('git status --porcelain');
  if (status) {
    console.log('⚠️  Uncommitted changes detected. Auto-committing before creating snapshot...');
    run('git add -A');
    const commitMsg = message
      ? `chore(snapshot): ${message}`
      : `chore(snapshot): save checkpoint before versioning`;
    run(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`);
    console.log('✅ Changes committed to working history.');
  }

  // Determine tag name
  let targetTag = customTag;
  if (!targetTag) {
    // Auto increment patch if starts with v
    const tags = run('git tag -l "v*" --sort=-creatordate')
      .split('\n')
      .map((t) => t.trim())
      .filter(Boolean);

    if (tags.length > 0) {
      const lastTag = tags[0];
      const match = lastTag.match(/^v(\d+)\.(\d+)\.(\d+)/);
      if (match) {
        const major = match[1];
        const minor = match[2];
        const patch = parseInt(match[3], 10) + 1;
        targetTag = `v${major}.${minor}.${patch}`;
      } else {
        targetTag = `v1.0.1`;
      }
    } else {
      targetTag = `v1.0.0`;
    }
  }

  const tagMessage =
    message || `Checkpoint snapshot ${targetTag} created at ${new Date().toISOString()}`;
  run(`git tag -a ${targetTag} -m "${tagMessage.replace(/"/g, '\\"')}"`);

  console.log(`🎉 Version \x1b[32m${targetTag}\x1b[0m created successfully!`);
  console.log(`   Message: ${tagMessage}\n`);
}

function downgradeVersion(targetTag?: string) {
  console.log('\n⏪ [Downgrading Version]');

  if (!targetTag) {
    const tags = run('git tag -l --sort=-creatordate')
      .split('\n')
      .map((t) => t.trim())
      .filter(Boolean);

    if (tags.length === 0) {
      console.error('❌ No version tags found to downgrade to.');
      process.exit(1);
    }
    console.log('Please specify a version tag to downgrade to. Available tags:');
    tags.forEach((t) => console.log(`  - ${t}`));
    console.log('\nExample: pnpm version:downgrade ' + tags[0]);
    process.exit(1);
  }

  // Verify tag exists
  try {
    run(`git rev-parse --verify ${targetTag}^{tag}`);
  } catch {
    try {
      run(`git rev-parse --verify ${targetTag}`);
    } catch {
      console.error(`❌ Version tag "${targetTag}" does not exist.`);
      process.exit(1);
    }
  }

  // Safety Backup: If any uncommitted changes, save them to a safety stash
  const status = run('git status --porcelain');
  if (status) {
    const backupName = `backup-before-downgrade-${Date.now()}`;
    console.log(`🛡️  Saving uncommitted work to safety stash: "${backupName}"...`);
    run(`git stash push -u -m "${backupName}"`);
    console.log('✅ Uncommitted changes safely preserved in git stash.');
  }

  // Checkout tag
  console.log(`🔄 Checking out version: \x1b[36m${targetTag}\x1b[0m...`);
  run(`git checkout ${targetTag}`);

  console.log(`\n✅ Successfully downgraded to \x1b[32m${targetTag}\x1b[0m!`);
  console.log('💡 Note: You are now viewing the exact code from that release.');
  console.log('👉 To return to the latest version anytime, simply run:');
  console.log('   \x1b[33mpnpm version:upgrade\x1b[0m\n');
}

function upgradeVersion() {
  console.log('\n⏩ [Upgrading to Latest]');

  // Check out main branch
  console.log('🔄 Checking out main branch...');
  run('git checkout main');

  // Check if there are safety stashes created by downgrade
  try {
    const stashList = run('git stash list');
    if (stashList.includes('backup-before-downgrade-')) {
      console.log(
        '🛡️  Found safety stash from previous downgrade. Restoring your work in progress...',
      );
      run('git stash pop');
      console.log('✅ Work in progress restored.');
    }
  } catch {
    // stash pop conflict or empty
  }

  const latestCommit = run('git log -1 --format="%h - %s (%cd)" --date=relative');
  console.log(`\n🎉 Back on \x1b[32mmain\x1b[0m branch at latest version!`);
  console.log(`   Latest commit: ${latestCommit}\n`);
}

function main() {
  const args = process.argv.slice(2);
  const action = args[0] || 'list';

  switch (action) {
    case 'list':
      listVersions();
      break;
    case 'snapshot':
    case 'tag':
      snapshotVersion(args[1], args[2]);
      break;
    case 'downgrade':
    case 'rollback':
      downgradeVersion(args[1]);
      break;
    case 'upgrade':
    case 'latest':
      upgradeVersion();
      break;
    default:
      console.log(`Unknown command: ${action}`);
      console.log('Usage:');
      console.log('  pnpm version:list');
      console.log('  pnpm version:snapshot [tag] [message]');
      console.log('  pnpm version:downgrade [tag]');
      console.log('  pnpm version:upgrade');
  }
}

main();
