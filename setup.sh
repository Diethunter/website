cat .env.example > .env
npm install
cd frontend
npm install
cd ..
mkdir tmp
touch tmp/db.sqlite3
node ace migration:run
git config --global --unset credential.helper
git config credential.helper store
npm run test
export CLIENT_URL="$(gp url 35729)/livereload.js?snipver=1&port=443"
{ gp await-port 5000 && sleep 5 && gp preview $(gp url 5000) & } &> /dev/null
gp open src/App.svelte
