# 一键自动下载亚马逊中国kindle的图书JavaScript脚本 2023年最新适用

据亚马逊预告，公司将于2023年6月30日停止在中国的Kindle电子书店运营。自此之后，您将无法购买新的电子书。对于已经购买的电子书，您将有至2024年6月30日下载，并且可以在此后继续阅读。

![forms-pc-1500-0531-1](https://github.com/yaleax/kindleAutoDownload/assets/5234415/d6f30003-f93f-4e6d-9fc0-8dd617700d2d)

在尝试了几个现有的脚本后，我发现有些已经失效，有些则需要获取cookie，这让我觉得不安全。因此，我决定亲自编写一个小脚本。
编写这个脚本花费了我大约6个小时（实际上，如果我手动下载这900多本书，可能不需要1个小时）。
尽管我对JavaScript和CSS有一定的基础，但我几乎忘记了所有的知识，所以在编写这个代码的过程中，我完全依赖了GPT-4。
现在，这个脚本已经写好并且可以工作，我想分享给你。我希望你会喜欢它，并希望它可以帮你节省时间，这样我的时间也不会白费。
如果有一天亚马逊网站进行了改版，你可以阅读我的代码，稍微修改一些元素名字，应该就能继续使用。
那时候，你可以将你的新代码pull request给我，让你的时间也有所价值。


## 文件结构

- README.md ---- 说明
- autoDown.js ---- 主程序
- getCookie.js ---- 获取cookie的程序（为node.js版本准备）
- initial.js ---- 初始版本，可下载当前页面的所有图书
- testNode.js ---- node.js环境下运行的测试版本，尚未完成

## 使用方法

1. 访问亚马逊的“管理我的内容和设备”页面：[https://www.amazon.cn/hz/mycd/digital-console/contentlist/booksAll/dateDsc](https://www.amazon.cn/hz/mycd/digital-console/contentlist/booksAll/dateDsc)
2. 进入控制台

在 Google Chrome 中打开浏览器控制台（也称为开发者工具），你可以按照以下步骤进行：

- 使用快捷键：在 Windows 和 Linux 上，你可以按 Ctrl + Shift + J。在 Mac 上，你可以按 Cmd + Option + J。
- 使用菜单：
  - 点击浏览器右上角的三个点，打开菜单。
  - 选择 "More Tools" 或者 "更多工具"。
  - 然后选择 "Developer Tools" 或者 "开发者工具"。
- 右键点击网页上的任意一个元素，然后选择 "Inspect" 或者 "检查"。

打开控制台后，你可以在 "Console" 标签下看到控制台，可以在这里输入 JavaScript 代码并运行。

3. 复制js代码

```
//最终版本 v5.1

// 主程序
function repeatProcess() {
    // 获得书籍的id号码并生成列表ids
    let elements = document.querySelectorAll('[id^="content-title-"]');
    let ids = [];
    for (let i = 0; i < elements.length; i++) {
        let id = elements[i].id;
        let uniquePart = id.replace("content-title-", ""); // 这将从ID中删除 "content-title-"。
        ids.push(uniquePart);
    }

    // 点击当前页面，全部图书的，查看更多
    for (let i = 0; i < ids.length; i++) {
        let button = document.getElementById("mobile-content-see-more-actions");
        if (button) {
            button.click();
        }
    }
    // 把列表ids放到自动下载程序里执行
    downloadItems(ids);
}

// 自动下载程序
function downloadItems(ids, i = 0) {
    if (i >= ids.length) {
        // 所有项目都已下载，请检查是否有其他页面
        setTimeout(checkNextPage, 1000);  // 检查下一页 1秒
    } else {
        // 构建元素
        let DOWNLOAD_AND_TRANSFER_ACTION = "DOWNLOAD_AND_TRANSFER_ACTION_" + ids[i];
        let download_and_transfer_list = "download_and_transfer_list_" + ids[i] + "_0";
        let DOWNLOAD_AND_TRANSFER_ACTION_CONFIRM = "DOWNLOAD_AND_TRANSFER_ACTION_" + ids[i] + "_CONFIRM";
        
        // 点击元素
        document.getElementById(DOWNLOAD_AND_TRANSFER_ACTION).click();
        document.getElementById(download_and_transfer_list).click();
        document.getElementById(DOWNLOAD_AND_TRANSFER_ACTION_CONFIRM).click();

        // 在关闭通知前增加一个延迟
        setTimeout(function() {
          document.getElementById("notification-close").click();
          setTimeout(function() {
            downloadItems(ids, i + 1);  // 继续下一步下载
          }, 2000);  // 在下次下载前增加一个延迟
        }, 1000);
    }
}

// 检查是否有另一个页面，如果有，则导航到该页面并重复这一过程。
function checkNextPage() {
    let activeElement = document.querySelector('.page-item.active');
    let nextElement = activeElement.nextElementSibling;
    if (nextElement && nextElement.classList.contains('page-item')) {
        let nextPageNumber = Number(activeElement.textContent) + 1;
        document.getElementById("page-" + nextPageNumber).click();
        setTimeout(repeatProcess, 2000);  // 延迟一段时间后再重复这个过程，让页面加载。
    } else {
        // 全部下载完成窗提示
        showNotification();
    }
}

// 显示全部下载完成的通知
function showNotification() {
    let notificationElement = document.createElement('div');
    notificationElement.id = "notification-success";
    notificationElement.className = "Notification-module_message_container__1I59M";

    notificationElement.innerHTML = `
    <div class="Notification-module_message_wrapper__1KMgj Notification-module_message_wrapper_success__2RUp8">
        <span id="notification-close" class="Notification-module_close__2N_IB" tabindex="0"></span>
        <div class="Notification-module_message_heading__2vO83 Notification-module_message_heading_success__1rCJl">
            <i aria-hidden="true" class="fa fa-check"></i>
            <div class="Notification-module_message_heading_container_success__zVMaH">
                <span>全部下载成功，祝你好运。</span>
            </div>
        </div>
        <div id="success_d0" class="Notification-module_message_heading_container__2R3WZ">
            <span><a href="https://calibre-ebook.com/download" rel="noopener nofollow" target="_blank">如果你想删除DRM，请去Calibre官方下载页面</a></span>
        </div>
    </div>`;

    document.body.appendChild(notificationElement);

    let closeButton = document.getElementById('notification-close');
    closeButton.addEventListener('click', function() {
        // 关闭通知
        notificationElement.style.display = "none";  
    });
}  

// 开始执行
repeatProcess();

```

[https://raw.githubusercontent.com/yaleax/kindleAutoDownload/main/autoDown.js](https://raw.githubusercontent.com/yaleax/kindleAutoDownload/main/autoDown.js)

复制js代码到console粘贴代码并按回车键（enter/return）程序就会开始运行

当下载开始时，你将看到如下提示：

![Screenshot 2023-05-24 at 13 35 29](https://github.com/yaleax/kindleAutoDownload/assets/5234415/6cc8cb1b-576d-4cf5-a366-797d6a866a36)

当所有图书下载完成后，你会看到如下提示：

![Screenshot 2023-05-24 at 11 40 45](https://github.com/yaleax/kindleAutoDownload/assets/5234415/cd697a74-368b-4f40-9e96-dba2a94d686d)

## 注意事项：

1. 此脚本只能在mobile模式下运行。要进入mobile模式，只需向左拖拽开发者工具窗口左边框，使浏览窗口变小即可。
2. 如果有的图书无法手动下载，程序将中止，你需要重新运行程序。
3. 我也为大家提供了只下载当前页的代码，这是初始版本。如果需要可以点击：[https://raw.githubusercontent.com/yaleax/kindleAutoDownload/main/initial.js](https://raw.githubusercontent.com/yaleax/kindleAutoDownload/main/initial.js)
4. 如果你长时间未在内容管理页面，JavaScript会暂停。当你再次回到页面，它将会继续运行。这可能是由于浏览器后台标签页优化机制导致的。解决方案可能包括：
- 不要将页面切换到后台：这可能不是你想要的，但如果你可以的话，让页面始终在前台运行是最简单的解决方案。
- 使用浏览器设置：一些浏览器可能允许你在设置中关闭这种优化机制。例如，在 Chrome 中，你可以在 "chrome://flags" 页面中查找与后台处理相关的设置。
- 使用 Web Workers：Web Workers 是一种可以在后台运行 JavaScript 的技术，不过这种方式可能需要对你的代码进行重大改动。
- 使用服务工作线程(Service Workers)：类似于 Web Workers，服务工作线程可以在后台运行，但是它们主要用于离线内容、推送通知和背景同步等。
请注意，这些解决方案可能并不总是有效，具体取决于你的浏览器和操作系统。

## 结语：

虽然这种方式相对简单，但是因为书太多，下载过程让我有些烦躁。我想如果能将代码转换为node.js在本地运行就好了！然而，因为我已经下载完了900多本书，所以就没有了继续优化的动力。虽然这个解决方案可能不够优雅，但它实用、安全，不用担心cookie泄露。下一步，我打算编写一个用于控制PPT的小工具，但那个可能就没有分享的机会了，因为它是为我自己的工作量身定做的。

