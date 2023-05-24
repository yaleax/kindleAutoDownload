# 一键自动下载亚马逊中国kindle的图书JavaScript脚本 2023年最新适用




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


注意：

1.此代码只能在mobile模式下可以运行。拖动开发者工具窗口左边框，向左，使浏览窗口变小，就会进入到mobile模式。

2.如果有的图书不能手动下载，这个程序将结束，你需要重新运行这个程序。

3.我还为大家提供了，只下载当前页的代码，这个是初稿。如果你有需要可以点击https://raw.githubusercontent.com/yaleax/kindleAutoDownload/main/initial.js

4.如果你长时间不在内容管理页面，JavaScript会暂停，你再次返回，它就能继续工作了。

-------------------------------------------------
下面是GPT-4给的解决办法，我没有尝试，你有兴趣可以试试。


这个问题可能是由于浏览器的后台标签页优化机制导致的。当你将一个标签页切换到后台时，浏览器可能会限制或暂停该页面的 JavaScript 执行以节省系统资源。这是一个常见的现象，尤其是在移动设备上。

这个问题可能没有一种简单的解决方案，因为这是由浏览器的内部机制决定的。但这里有一些可能的解决方案：

1. **不要将页面切换到后台**：这可能不是你想要的，但如果你可以的话，让页面始终在前台运行是最简单的解决方案。

2. **使用浏览器设置**：一些浏览器可能允许你在设置中关闭这种优化机制。例如，在 Chrome 中，你可以在 "chrome://flags" 页面中查找与后台处理相关的设置。

3. **使用 Web Workers**：Web Workers 是一种可以在后台运行 JavaScript 的技术，不过这种方式可能需要对你的代码进行重大改动。

4. **使用服务工作线程(Service Workers)**：类似于 Web Workers，服务工作线程可以在后台运行，但是它们主要用于离线内容、推送通知和背景同步等。

请注意，这些解决方案可能并不总是有效，具体取决于你的浏览器和操作系统。
