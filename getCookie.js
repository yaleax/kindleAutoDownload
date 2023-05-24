// 获取 cookie  
if (typeof cookie === 'undefined') {
        cookie = document.cookie;
    }
console.log("Cookie: ", cookie); 

// 获取 CSRF token
if (typeof csrfToken === 'undefined') {
    let csrfToken;
    let metaTags = document.getElementsByTagName('meta');
    for (let i = 0; i < metaTags.length; i++) {
        if (metaTags[i].getAttribute('name') === 'csrf-token') {
            csrfToken = metaTags[i].getAttribute('content');
            break;
        }
    }
}
console.log("CSRF Token: ", csrfToken);
