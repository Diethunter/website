cat .env.example > .env
npm install -g @angular/cli
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
