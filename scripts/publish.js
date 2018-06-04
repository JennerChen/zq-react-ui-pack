(async function () {
  const shell = require("shelljs");
  const inquirer = require("inquirer");

  const checkCommandExist = function (cmd) {
    if (!shell.which(cmd)){
      shell.echo(`Sorry, this script requires ${ cmd }`);
      shell.exit(1);
    }
  };

  ["git","yarn"].forEach( cmd => checkCommandExist(cmd) );

  const pkg = JSON.parse(shell.cat("package.json"));

  // Bump version number
  var nrs = pkg.version.split(".");
  nrs[2] = 1 + parseInt(nrs[2], 10);

  const { version, gitPush } = await inquirer.prompt([{
    type: "input",
    name: "version",
    message: "请输入新版本的版本号, 例如 0.0.5",
    default: nrs.join("."),
    validate: function (value) {
      return value.match(/^\d+\.\d+\.\d+$/) ? true : "请输入正确的版本号, 例如 0.0.5"
    }
  },{
    type: "confirm",
    name: "gitPush",
    message: "是否创建对应版本Tag,并且Push到仓库",
    default: true
  }]);

  const npmPkgInfo = JSON.parse(
    shell.exec(`yarn info ${ pkg.name } --json`, {
    silent: true
  }).stdout).data;

  if (npmPkgInfo.versions.includes(version)){
    shell.echo(`版本 ${ version }, 已经存在`);
    shell.exit(2)
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






