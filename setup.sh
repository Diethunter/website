npm install
cd frontend
npm install
cd ..
mkdir tmp
touch tmp/db.sqlite3
node ace migration:run
cat .env.example >> .env
git config --global --unset credential.helper
git config credential.helper store
echo "Remember to fill in data for .env"
echo "App key:"
node ace generate:key
