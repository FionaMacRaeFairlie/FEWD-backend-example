In order to download and use the code examples provided you should clone the repository. 

Cloning is the process of downloading a repository from a remote server  using the clone command. Open a terminal window in Visual Studio Code ( or use a terminal window provided by your operating system). Type the following command to download the project from a remote server to the folder you are currently in locally.

git clone https://github.com/UserName/RepoName.git   e.g.  git clone https://github.com/FionaMacRaeFairlie/lab2-git.git

The node_modules folder is not normally part of a cloned repository and should be added using the npm install command. Using this command will install the node_modules folder and set up all the dependencies mentioned in package.json file. To get the node_modules folder and dependances set up correctly you need to move into the root directory of the cloned project. So use cd to move to the correct folder then npm install toget the node dependancies set up

cd RepoName  e.g. cd lab2-git

npm install

It can take some time to download all the dependencies into the node_modules directory, after the completion of this process, the project is ready to run. ( In the case of the example given above you would run the project by typing node index)
