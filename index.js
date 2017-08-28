const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const GithubAPI = require('./commit')
const app = new Koa();
const router = new Router();
const port = 3010;
const token = 'YOUR OWN TOKEN HERE';
const prefix = 'https://raw.githubusercontent.com/'
const committer = {
  "name": "wuzhizhe",
  "email": "wuzhizhemu569@gmail.com",
  "repo": "subservices",
  "branch": "master"
}
const commitMsg = 'Add new pictrue';
const commitSuccess = 'Files committed!';
const dataLimit = '30960kb';

const bp = new bodyParser({
  formLimit: dataLimit
});

let api = new GithubAPI({token: token});
api.setRepo(committer.name, committer.repo);


function commitFiles(data) {
  return api.setBranch(committer.branch)
    .then( () => api.pushFiles(
        commitMsg,
        data
    ))
    .then(function() {
        console.log(commitSuccess);
    });
}

router.post('/images', async (ctx) => {
  console.log('start upload')
  let images = ctx.request.body.images;
  let returnArray = [];
  await commitFiles(images);
  for (let i = 0; i < images.length; i++) {
    returnArray.push(prefix + committer.name + '/' + committer.repo + '/' + committer.branch + '/' + images[i].path);
  }
  ctx.body = {
    success: true,
    images: returnArray
  }
})

app
  .use(bp)
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port);