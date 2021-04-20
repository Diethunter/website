cat .env.example > .env
npm install
mkdir tmp
touch tmp/db.sqlite3
node ace migration:run
git config --global --unset credential.helper
git config credential.helper store
npm run test
