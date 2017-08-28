# uploadFileToGithub

上传文件到github，用了git data api，此处代码


将github-api里的Repository.js里createBlob方法的postbody修改成下面的代码.

```javascript

var postBody = null;
if (typeof content === 'object') {
    postBody = content;
} else {
    postBody = this._getContentObject(content);
}

```