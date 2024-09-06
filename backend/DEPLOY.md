# Build & Deploy to Render

### Repository
The repository used for your Web Service.

https://github.com/Raddames-Tonui/Freelance-Job-Board


### Branch
The Git branch to build and deploy.

`main`

### Root Directory
If set, Render runs commands from this directory instead of the repository root. Additionally, code changes outside of this directory do not trigger an auto-deploy. Most commonly used with a monorepo.

`backend`

### Build Command
Render runs this command to build your app before each deploy.

`backend/ $` `pip install -r requirements.txt`


### Pre-Deploy CommandOptional
Render runs this command before the start command. Useful for database migrations and static asset uploads.

`backend/ $`


### Start Command
Render runs this command to start your app with each deploy.

`backend/ $` `gunicorn app:app`


### Auto-Deploy
By default, Render automatically deploys your service whenever you update its code or configuration. Disable to handle deploys manually. Learn more.

`Yes`


### Deploy hook
Your private URL to trigger a deploy for this server. Remember to keep this a secret.

`https://api.render.com/deploy/srv-cqvft45ds78s73980?key=wBU5FxCrn8`

![alt text](<Screenshot 2024-09-06 035225.png>)
![alt text](<Screenshot 2024-09-06 035241.png>) 
