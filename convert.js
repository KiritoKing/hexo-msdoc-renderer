const fs = require("fs");
const cp = require("child_process");
const path = require("path");
const dayjs = require("dayjs");

const root = process.cwd();

const dir = fs.readdirSync(path.join(root, "doc"));
const outputRoot = path.join(root, "source/_posts");

for (const file of dir) {
    if (file.split('.').length === 1) {
        const innerDir = fs.readdirSync(path.join(root, "doc", file));
        for (const innerFile of innerDir) {
            const nameArr = innerFile.split('.');
            if (nameArr[nameArr.length - 1] === "docx") {
                const name = innerFile.slice(0, innerFile.lastIndexOf('.'));
                const input = path.join(root, "doc", file, innerFile);
                const output = path.join(outputRoot, file, dayjs().format("YYYY-MM-DD").toString() + "@" + name);
                // const output = path.join(outputRoot, file, name);
                const filter = path.join(root, "filter.js");
                if (fs.existsSync(output)) {
                    fs.rmdirSync(output, {recursive: true});
                }
                if (fs.existsSync(output + ".md")) {
                    fs.rmSync(output + ".md");
                }
                cp.exec(`pandoc -f docx -t markdown --output=${output}.md --filter=${filter} ${input}`,
                    (err) => {
                        if (err) console.error(err);
                    });
                cp.exec(`pandoc -f docx -t markdown --extract-media=${output} ${input}`,
                    (err) => {
                        if (err) console.error(err);
                    });
            }
        }
    }
}

console.log(`All docs are converted to markdown files in ${outputRoot}`);