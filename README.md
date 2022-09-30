
## DIRECTIONS FOR RUNNING

Make sure you have docker installed
https://www.docker.com/

Make sure you have composer installed

https://getcomposer.org/

Go To the directory

cd ~/your/path/to/task_app

Next install Laravel Sail

composer require laravel/sail --dev

Run after installing

php artisan sail:install

./vendor/bin/sail up

After sail container is working in docker inside the task_app folder run

./vendor/bin/sail php artisan migrate:refresh --seed

inside the task_app folder run

./vendor/bin/sail npm install

./vendor/bin/sail npm run dev

Head to localhost:80/tasks to run the application

If you already have a sail app your port maybe different

To destroy container run from withing task_app director
./vendor/bin/sail down 



