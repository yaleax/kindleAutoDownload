// 这个运行在node.js环境下，现在还不能用，未完成！

const axios = require('axios');
const cheerio = require('cheerio');

async function downloadItems(ids, i = 0) {
    if (i >= ids.length) {
        // 所有项目都已下载，请检查是否有其他页面
        setTimeout(checkNextPage, 1000);  // 在检查下一页之前增加一个延迟
    } else {
        let id = ids[i];

        // 在这里，我们假设你的目标网站有一个API接口，你可以通过发送GET请求到这个API接口来下载项目。
        // 你需要替换这个URL。
        let url = `https://example.com/api/download?id=${id}`;

        // 发送GET请求到目标URL
        let response = await axios.get(url);

        // 在这里，我们假设当项目下载完成时，服务器会返回一个状态码200。
        if (response.status === 200) {
            // 项目已成功下载，继续下载下一个项目
            setTimeout(() => downloadItems(ids, i + 1), 2000);
        }
    }
}

async function checkNextPage() {
    // 在这里，我们假设你的目标网站有一个API接口，你可以通过发送GET请求到这个API接口来获取下一页的项目ID。
    // 你需要替换这个URL。
    let url = `https://example.com/api/nextPage`;

    // 发送GET请求到目标URL
    let response = await axios.get(url);

    // 解析响应数据
    const $ = cheerio.load(response.data);

    // 提取所有的项目ID
    let ids = [];
    $('[id^="content-title-"]').each((i, element) => {
        let id = $(element).attr('id').replace("content-title-", "");
        ids.push(id);
    });

    // 下载项目
    downloadItems(ids);
}

// 开始执行
checkNextPage();

const puppeteer = require('puppeteer');

async function repeatProcess() {
    // 启动浏览器
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 打开页面
    await page.goto('http://example.com');

    // 片段当前页面所在页数
    var activePageItem = await page.$eval('.page-item.active', el => el.textContent);

    // 获得书籍的id号码并生成列表
    let elements = await page.$$('[id^="content-title-"]');
    let ids = [];
    for (let i = 0; i < elements.length; i++) {
        let id = elements[i]._remoteObject.description;
        let uniquePart = id.replace("content-title-", ""); // 这将从ID中删除 "content-title-"。
        ids.push(uniquePart);
    }

    // 点击全部图书的，查看更多
    for (let i = 0; i < ids.length; i++) {
        let button = await page.$('#mobile-content-see-more-actions');
        if (button) {
            await button.click();
        }
    }

    // 下载
    await downloadItems(ids);

    // 关闭浏览器
    await browser.close();
}

