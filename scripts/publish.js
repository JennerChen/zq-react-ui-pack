
(async function () {
  const shell = require("shelljs");
  const inquirer = require("inquirer");
  let stdin = process.stdin;
  stdin.on("data", (key) => {
    if (key === "\u0003") {
      shell.exit(1, "用户终止了进程");
    }
  });

  const checkCommandExist = function (cmd) {
    if (!shell.which(cmd)){
      shell.echo(`Sorry, this script requires ${ cmd }`);
      shell.exit(1);
    }
  };

  ["git","yarn"].forEach( cmd => checkCommandExist(cmd) );

  const pkg = JSON.parse(shell.cat("package.json"));

  const { versionType } = await inquirer.prompt([{
    name: "versionType",
    type: "list",
    message: "请选择发布类型 alpha(内侧) beta(公测) release(稳定)",
    choices: [
      "alpha",
      "beta",
      "release"
    ]
  }]);

  // Bump version number;
  const pkgVersion = pkg.version.includes("-") ? pkg.version.split("-")[0] : pkg.version;
  const nrs = pkgVersion.split(".");

  switch (versionType){
    case "alpha":
      nrs[2] = `${ nrs[2] }-alpha.${ Math.random().toString().slice(4,8) }`;
      break;
    case "beta":
      nrs[2] = `${ nrs[2] }-beta.${ Math.random().toString().slice(4,8) }`;
      break;
    default:
      nrs[2] = 1 + parseInt(nrs[2], 10);
  }

  const { version, gitPush } = await inquirer.prompt([{
    type: "input",
    name: "version",
    message: "请输入新版本的版本号, 例如 0.0.5",
    default: nrs.join("."),
    validate: function (value) {
      let val = value.includes("-") ? value.split("-")[0] : value;
      return val.match(/^\d+\.\d+\.\d+$/) ? true : "请输入正确的版本号, 例如 0.0.5"
    }
  },{
    type: "confirm",
    name: "gitPush",
    message: "是否创建对应版本Tag,并且Push到仓库",
    default: true
  }]);

  if (!version)  {
    shell.exit(1)
  }

  let npmPkgInfo =  null;
  try{
    npmPkgInfo = JSON.parse(
      shell.exec(`yarn info ${ pkg.name } --json`, {
        silent: true
      }).stdout).data;
  }catch (e) {
    shell.echo(`无法获取远端包信息`);
    shell.exit(1);
  }

  if (npmPkgInfo.versions.includes(version)){
    shell.echo(`版本 ${ version }, 已经存在`);
    shell.exit(1)
  }

  pkg.version = version;

  shell.ShellString(JSON.stringify(pkg,null,2)).to("package.json");

  shell.exec(`git commit -am 'Publish Version ${ version }'`);

  shell.exec("yarn run build");

  if (gitPush){

    shell.echo("开始 Push 到仓库 ...");

    shell.exec(`git tag ${ version }`);
    shell.exec(`git push`);
    shell.exec(`git push --tags`);

    shell.echo("Push 到仓库完成")
  }

})();






