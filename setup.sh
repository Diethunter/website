cat .env.example >> .env
npm install
#Save the following scripts for when I start making frontend
#cd frontend
#npm install
#cd ..
mkdir tmp
touch tmp/db.sqlite3
node ace migration:run
git config --global --unset credential.helper
git config credential.helper store
