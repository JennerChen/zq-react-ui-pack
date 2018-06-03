module.exports = function(shell, npm, git, yarn) {
  yarn("run", "build");

  var pkg = JSON.parse(shell.read("package.json"));

  // Bump version number
  var nrs = pkg.version.split(".");
  nrs[2] = 1 + parseInt(nrs[2], 10);
  var version = (pkg.version = shell.prompt(
    "Please specify the new package version of '" + pkg.name + "' (Ctrl^C to abort)",
    nrs.join(".")
  ));
  if (!version.match(/^\d+\.\d+\.\d+$/)) shell.exit(1, "Invalid semantic version: " + version);

  // Check registery data
  if (yarn.silent().test("info", pkg.name)) {
    //    console.log();

    //package is registered in npm?
    var publishedPackageInfo = JSON.parse(yarn.get("info", pkg.name, "--json")).data;
    console.log(publishedPackageInfo, "11");
    //      JSON.parse(yarn.get("info", pkg.name, "--json"));
    if (
      publishedPackageInfo.versions === version ||
      publishedPackageInfo.versions.indexOf(version) !== -1
    )
      shell.exit(2, "Version " + pkg.version + " is already published to npm");

    shell.write("package.json", JSON.stringify(pkg, null, 2));

    // Finally, commit and publish!
    //    npm("publish");
    git("commit", "-am", "Published version " + version);
    git("tag", version);

    git("push");
    git("push", "--tags");
    console.log("Published!");
  } else shell.exit(1, pkg.name + " is not an existing npm package");
};
