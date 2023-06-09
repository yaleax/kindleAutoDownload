//最终版本 v5.2

// 主程序
function repeatProcess() {
    // 获得书籍的id号码并生成列表ids
    let elements = document.querySelectorAll('[id^="content-title-"]');
    let ids = [];
    for (let i = 0; i < elements.length; i++) {
        //如何检查有样章字样，跳过
        if (elements[i].parentElement.textContent.includes("样章")) {
            continue
        }
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

        // 获取元素
        let actionElement = document.getElementById(DOWNLOAD_AND_TRANSFER_ACTION);
        let listElement = document.getElementById(download_and_transfer_list);
        let confirmElement = document.getElementById(DOWNLOAD_AND_TRANSFER_ACTION_CONFIRM);

        // 检查元素存在并点击
        if(actionElement) actionElement.click();
        if(listElement) listElement.click();
        if(confirmElement) confirmElement.click();

        // 在关闭通知前增加一个延迟
        setTimeout(function() {
          let notificationClose = document.getElementById("notification-close");
          if(notificationClose) {
            notificationClose.click();
            setTimeout(function() {
              downloadItems(ids, i + 1);  // 继续下一步下载
            }, 2000);  // 在下次下载前增加一个延迟
          }
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

    // 创建全屏覆盖的div元素
    let backdropElement = document.createElement('div');
    backdropElement.className = "Notification-module_module_backdrop__104tk";

    // 将全屏覆盖的div元素添加到body中
    document.body.appendChild(backdropElement);

    closeButton.addEventListener('click', function() {
        // 关闭全屏覆盖的div元素
        backdropElement.style.display = "none";  
    });
}


// 开始执行
repeatProcess();
