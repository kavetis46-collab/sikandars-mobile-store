import subprocess

# Stage all files
subprocess.run(['git', 'add', '.'])

# Commit
commit_res = subprocess.run(['git', 'commit', '-m', 'Add netlify.toml, .nvmrc, public/_redirects and configure build for Netlify'], capture_output=True, text=True)
print("COMMIT STDOUT:", commit_res.stdout)
print("COMMIT STDERR:", commit_res.stderr)

# Get token and push
token = subprocess.check_output(['gh', 'auth', 'token'], text=True).strip()
repo_url = f"https://{token}@github.com/kavetis46-collab/sikandars-mobile-store.git"

print("Pushing to GitHub...")
push_res = subprocess.run(['git', 'push', repo_url, 'main'], capture_output=True, text=True)
print("PUSH STDOUT:", push_res.stdout)
print("PUSH STDERR:", push_res.stderr)

# Clean up remote url to clean https
subprocess.run(['git', 'remote', 'set-url', 'origin', 'https://github.com/kavetis46-collab/sikandars-mobile-store.git'])
print("Successfully pushed to GitHub!")
