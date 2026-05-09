import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const rootDir = process.cwd();
const distDir = join(rootDir, 'dist');
const deployDir = join(rootDir, '.deploy_git');
const configPath = join(rootDir, 'deploy.config.json');

const run = (command, args, options = {}) => {
  execFileSync(command, args, { stdio: 'inherit', ...options });
};

const capture = (command, args, options = {}) => {
  return spawnSync(command, args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options,
  });
};

const readConfig = () => {
  if (!existsSync(configPath)) {
    console.error('Missing deploy.config.json.');
    process.exit(1);
  }

  const config = JSON.parse(readFileSync(configPath, 'utf8'));

  if (!config.repo) {
    console.error('Missing "repo" in deploy.config.json.');
    process.exit(1);
  }

  return {
    repo: config.repo,
    branch: config.branch || 'main',
    message: config.message || 'deploy homepage',
  };
};

const removeDeployContents = () => {
  for (const entry of readdirSync(deployDir, { withFileTypes: true })) {
    if (entry.name === '.git') {
      continue;
    }

    rmSync(join(deployDir, entry.name), { recursive: true, force: true });
  }
};

const assertCleanDeployDir = () => {
  const status = capture('git', ['status', '--porcelain'], { cwd: deployDir });

  if (status.status !== 0) {
    console.error(status.stderr || 'Failed to inspect .deploy_git status.');
    process.exit(status.status || 1);
  }

  if (status.stdout.trim()) {
    console.error('.deploy_git has uncommitted changes. Commit, discard, or delete .deploy_git before deploying.');
    process.exit(1);
  }
};

const ensureDeployWorktree = ({ repo, branch }) => {
  if (!existsSync(deployDir)) {
    mkdirSync(dirname(deployDir), { recursive: true });
    const clone = capture('git', ['clone', '--branch', branch, '--single-branch', repo, deployDir]);

    if (clone.status === 0) {
      return;
    }

    run('git', ['clone', repo, deployDir]);
  }

  const remote = capture('git', ['remote', 'get-url', 'origin'], { cwd: deployDir });

  if (remote.status !== 0) {
    run('git', ['remote', 'add', 'origin', repo], { cwd: deployDir });
  } else if (remote.stdout.trim() !== repo) {
    run('git', ['remote', 'set-url', 'origin', repo], { cwd: deployDir });
  }

  assertCleanDeployDir();
  run('git', ['fetch', 'origin'], { cwd: deployDir });

  const remoteBranch = capture('git', ['rev-parse', '--verify', `origin/${branch}`], {
    cwd: deployDir,
  });

  if (remoteBranch.status === 0) {
    run('git', ['checkout', branch], { cwd: deployDir });
    run('git', ['pull', '--ff-only', 'origin', branch], { cwd: deployDir });
    return;
  }

  run('git', ['checkout', '--orphan', branch], { cwd: deployDir });
  removeDeployContents();
};

const hasChanges = () => {
  const status = capture('git', ['status', '--porcelain'], { cwd: deployDir });

  if (status.status !== 0) {
    console.error(status.stderr || 'Failed to inspect deploy changes.');
    process.exit(status.status || 1);
  }

  return Boolean(status.stdout.trim());
};

const main = () => {
  const config = readConfig();

  run(process.execPath, ['node_modules/astro/astro.js', 'build']);

  ensureDeployWorktree(config);
  removeDeployContents();
  cpSync(distDir, deployDir, { recursive: true });

  run('git', ['add', '-A'], { cwd: deployDir });

  if (!hasChanges()) {
    console.log('No changes to deploy.');
    return;
  }

  run('git', ['commit', '-m', config.message], { cwd: deployDir });
  run('git', ['push', 'origin', config.branch], { cwd: deployDir });

  console.log(`Deployed dist/ to ${config.repo}#${config.branch}`);
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
