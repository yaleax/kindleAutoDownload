//v1.0正式版 下载当前页版本
//片段当前页面所在页数
var activePageItem = document.querySelector('.page-item.active').textContent

//获得书籍的id号码并生成列表
let elements = document.querySelectorAll('[id^="content-title-"]');

// Create an array to store the unique parts of the ids
let ids = [];

// Loop through each element, extract the unique part of the id, and add it to the array
for (let i = 0; i < elements.length; i++) {
    let id = elements[i].id;
    let uniquePart = id.replace("content-title-", ""); // This will remove "content-title-" from the id
    ids.push(uniquePart);
}

// 打印ids
//console.log(ids);

//打开全部更多
for (let i = 0; i < ids.length; i++) {
    let button = document.getElementById("mobile-content-see-more-actions");
    if (button) {
        button.click();
    }
}

// 循环执行下载
for (let i = 0; i < ids.length; i++) {
  // Use setTimeout to delay the execution of the function
  setTimeout(function() {
    // Construct the ids
    let DOWNLOAD_AND_TRANSFER_ACTION = "DOWNLOAD_AND_TRANSFER_ACTION_" + ids[i];
    let download_and_transfer_list = "download_and_transfer_list_" + ids[i] + "_0";
    let DOWNLOAD_AND_TRANSFER_ACTION_CONFIRM = "DOWNLOAD_AND_TRANSFER_ACTION_" + ids[i] + "_CONFIRM";
    
    // Click the elements
    document.getElementById(DOWNLOAD_AND_TRANSFER_ACTION).click();
    document.getElementById(download_and_transfer_list).click();
    document.getElementById(DOWNLOAD_AND_TRANSFER_ACTION_CONFIRM).click();
    document.getElementById("notification-close").click();

  }, i * 3000); // The delay is i * 3000 milliseconds, or i * 3 seconds
}
