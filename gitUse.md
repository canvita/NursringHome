1.
git init (创建git最初始的位置)
git remote add origin url
git clone url (获取到那个库的文件然后以后修改都在里边进行);
使用自己的git,在NursringHome中复制cd /Applications/MAMP/htdocs/myNursringHome cd C:/wamp64/www/NursringHome
git checkout选择分支,
git pull 同步数据
git add .
git commit -m "要说的话"
git push -u origin 分支名字
其他方法在网页上查找
2.
使用实验室的git,在nursringLab的NursringHome中复制cd /Applications/MAMP/htdocs/nursringLab/NursringHome
git checkout zz 到自己的分支
git pull 同步数据(如果需要的话)
git add .添加所有修改的数据到缓存区
git commit -m "要说的话"
git push -u origin 分支名字
其他方法网上找
在上面增加分支git push --set-upstream origin ldy
前提是已经在本地创建了这么一个分支
如果远程服务端已经有那个分支在本地是看不到的但是可以切换到那个分支,他会提示在远程同步过来了
