# kindleAutoDownload
自动下载亚马逊中国kindle的图书


亚马逊将于一年之后即2023年6月30日，在中国停止Kindle电子书店的运营。
在此之后，您将不能购买新的电子书。
对于已经购买的电子书，您可以在2024年6月30日之前下载，并且可以在此后继续阅读。

所以有了这个小脚本，这个脚本是模拟了真人点击下载的全过程。

我是在GPT-4的协助下完成的这个代码。

![forms-pc-1500-0531-1](https://github.com/yaleax/kindleAutoDownload/assets/5234415/d6f30003-f93f-4e6d-9fc0-8dd617700d2d)


使用方法

一 访问亚马逊管理我的内容和设备地址
https://www.amazon.cn/hz/mycd/digital-console/contentlist/booksAll/dateDsc

二 进入控制台
在 Google Chrome 中打开浏览器控制台（也称为开发者工具），你可以按照以下步骤进行：
1. 使用快捷键：在 Windows 和 Linux 上，你可以按 `Ctrl` + `Shift` + `J`。在 Mac 上，你可以按 `Cmd` + `Option` + `J`。
2. 使用菜单：
   - 点击浏览器右上角的三个点，打开菜单。
   - 选择 "More Tools" 或者 "更多工具"。
   - 然后选择 "Developer Tools" 或者 "开发者工具"。
3. 右键点击网页上的任意一个元素，然后选择 "Inspect" 或者 "检查"。
打开控制台后，你可以在 "Console" 标签下看到控制台，可以在这里输入 JavaScript 代码并运行。

三 复制js代码
https://raw.githubusercontent.com/yaleax/kindleAutoDownload/main/autoDown.js

程序会自动下载你所有的图书，完后后会有提示。

![Screenshot 2023-05-24 at 11 40 45](https://github.com/yaleax/kindleAutoDownload/assets/5234415/cd697a74-368b-4f40-9e96-dba2a94d686d)


注意：此代码只能在mobile模式下可以运行。拖动开发者工具窗口左边框，向左，使浏览窗口变小，就会进入到mobile模式。
