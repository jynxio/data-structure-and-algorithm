const fs = require( "fs" );
const path = require( "path" );
const fontcaster = require( "font-caster" );
const readlineSync = require( "readline-sync" );

/* 原始字体文件的路径 */
const ORIGIN_EN_400 = "./static/font/original/en-400.ttf";
const ORIGIN_EN_700 = "./static/font/original/en-700.ttf";
const ORIGIN_ZH_400 = "./static/font/original/zh-400.woff";
const ORIGIN_ZH_700 = "./static/font/original/zh-700.woff";
const ORIGIN_CO_400 = "./static/font/original/co-400.ttf";

/* 子集字体文件的路径 */
const SUBSET_EN_400 = "./static/font/subset/en-400.ttf";
const SUBSET_EN_700 = "./static/font/subset/en-700.ttf";
const SUBSET_ZH_400 = "./static/font/subset/zh-400.woff";
const SUBSET_ZH_700 = "./static/font/subset/zh-700.woff";
const SUBSET_CO_400 = "./static/font/subset/co-400.ttf";

/* unicode文件的路径 */
const UNICODE_EN_400 = "./static/font/unicode/en-400.txt";
const UNICODE_EN_700 = "./static/font/unicode/en-700.txt";
const UNICODE_ZH_400 = "./static/font/unicode/zh-400.txt";
const UNICODE_ZH_700 = "./static/font/unicode/zh-700.txt";
const UNICODE_CO_400 = "./static/font/unicode/co-400.txt";

async function subset() {

    const question = `The program will subset the default font files based on the .html files. Please enter the path to a .html file (eg "./a.html"), or the path to a folder where the .html file is stored (eg "./test").\nPlease enter path: `;
    const path = readlineSync.question( question );
    const stats = fs.statSync( path );

    if ( stats.isFile() ) {

        console.log( `The program will subset the default font files based on this files: "${ path }"` );

        subsetBaseOnOneHtml( path );

    } else if ( stats.isDirectory() ) {

        console.log( `The program will subset the default font files based on the .html files in this folder: "${ path }"` )

        subsetBaseOnMultipleHtml( path );

    }

}

function subsetBaseOnOneHtml() {}

function subsetBaseOnMultipleHtml() {}

module.exports = { subset };
