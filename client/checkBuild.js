const dircompare = require('dir-compare');

const options = {
    compareContent: true,
    compareFileSync: dircompare.fileCompareHandlers.lineBasedFileCompare.compareSync,
    compareFileAsync: dircompare.fileCompareHandlers.lineBasedFileCompare.compareAsync,
    ignoreLineEnding: true,      // Ignore crlf/lf line ending differences
    ignoreWhiteSpaces: true,     // Ignore white spaces at the beginning and ending of a line (similar to 'diff -b')
    ignoreAllWhiteSpaces: true,  // Ignore all white space differences (similar to 'diff -w')
    ignoreEmptyLines: true       // Ignores differences caused by empty lines (similar to 'diff -B')
};

const path1 = './build';
const path2 = './public';
const res = dircompare.compareSync(path1, path2, options);
console.log("\x1b[33mThe build folder is " + (res.same ? "" : "NOT") + " up to date.\x1b[0m");
if (!res.same) {
    console.log("Number of differences: " + res.differences);
    console.log("Please run 'npm run build' and commit the changes.");
    process.exit(1);
}
process.exit(0);