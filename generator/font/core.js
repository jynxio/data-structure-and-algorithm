const fs = require( "fs" );
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

    const question = `\nThe program will subset the default font files based on the .html files. Please enter the path to a .html file (eg ./a.html), or the path to a folder where the .html file is stored (eg ./test).\nPlease enter: `;
    const path = readlineSync.question( question );
    const stats = fs.statSync( path );

    if ( stats.isFile() ) {

        await subsetBaseOnOneHtml( path );

        return;

    }

    if ( stats.isDirectory() ) {

        await subsetBaseOnMultipleHtml( path );

        return;

    }

}

async function subsetBaseOnOneHtml( path ) {

    console.log( `\nThe program will subset the default font files based on this files: ${ path }` );

    /* Confirm */
    {

        const question = "Are you sure? (y/n)\nPlease enter: "
        const answer = readlineSync.question( question );
        const is_confirm = answer === "y";

        if ( ! is_confirm ) return;

    }

    /* en-400 */
    {

        const response = await subsetCore( path, UNICODE_EN_400, ORIGIN_EN_400, SUBSET_EN_400, undefined );

        if ( ! response.success ) {

            console.error( "Error: ", response.error );

            return;

        }

        console.log( "Done: en-400" );

    }

    /* en-700 */
    {

        const response = await subsetCore( path, UNICODE_EN_700, ORIGIN_EN_700, SUBSET_EN_700, undefined );

        if ( ! response.success ) {

            console.error( "Error: ", response.error );

            return;

        }

        console.log( "Done: en-700" );

    }

    /* zh-400 */
    {

        const response = await subsetCore( path, UNICODE_ZH_400, ORIGIN_ZH_400, SUBSET_ZH_400, undefined );

        if ( ! response.success ) {

            console.error( "Error: ", response.error );

            return;

        }

        console.log( "Done: zh-400" );

    }

    /* zh-700 */
    {

        const response = await subsetCore( path, UNICODE_ZH_700, ORIGIN_ZH_700, SUBSET_ZH_700, undefined );

        if ( ! response.success ) {

            console.error( "Error: ", response.error );

            return;

        }

        console.log( "Done: zh-700" );

    }

    /* co-400 */
    {

        const response = await subsetCore( path, UNICODE_CO_400, ORIGIN_CO_400, SUBSET_CO_400, undefined );

        if ( ! response.success ) {

            console.error( "Error: ", response.error );

            return;

        }

        console.log( "Done: co-400" );

    }

    console.log( "All done!" );

}

async function subsetBaseOnMultipleHtml( path ) {

    console.log( `\nThe program will subset the default font files based on the .html files in this folder: ${ path }` );

}

/**
 * （异步）字体子集化。
 * @param { string } html_path - html文件的路径（如"./page/index.html"），或文件夹的路径（如"./page"）。若
 * 入参是html文件的路径，则将基于该html文件来进行字体子集化；若入参是文件夹的路径，则将基于该文件夹内的所有的html文件
 * 来进行字体子集化。
 * @param { undefined | string } unicode_path - txt文件的路径（如"./unicode.txt"），txt的内容必须是以逗号
 * 分隔的unicode，参考write API；若入参是txt文件的路径，则其中的unicode将一起参与字体子集化，若入参是undefined，
 * 则不影响字体子集化。
 * @param { string } origin_font_path - 原始的字体文件的路径（如"./origin.woff"），支持otf、ttf、woff格式。
 * @param { string } subset_font_path - 生成的字体文件的路径（如"./subset.woff"），生成的字体文件的格式必须等
 * 于原始的字体文件的格式。
 * @param { undefined | Array<string> } tagnames - 若入参是undefined，则会提取所有的html文件的所有的标签的
 * 内容来进行字体子集化；若入参是["p", "a"]，则会提取所有的html文件的所有的h1标签和a标签的内容来进行字体子集化，同理
 * 类推其他标签。注意：1.不能输入自闭合标签；2.不区分标签名的大小写。
 * @returns { Promise } - Promise代表是否执行成功，若失败，则返回{success: false, error}对象；若成功，则返回
 * {success, true, information}对象，参考subset API。
 */
 async function subsetCore(

    html_path,

    unicode_path,

    origin_font_path,

    subset_font_path,

    tagnames,

) {

    let characters  = "";

    /* 提取txt文件的字符集。 */
    if ( unicode_path !== undefined ) {

        const response = await fontcaster.read( unicode_path, true );

        if ( ! response.success ) return { success: false, error: response.error };

        characters += fontcaster.convert( response.files[ 0 ].content );

    }

    /* 提取html文件的字符集。 */
    {

        const response = await fontcaster.read( html_path, false );

        if ( ! response.success ) return { success: false, error: response.error };

        for ( const file of response.files ) {

            const { name, type, content } = file;

            if ( type !== "html" ) continue;

            characters += fontcaster.deduplication( fontcaster.parseHtml( content, tagnames ) );

        }

        characters = fontcaster.deduplication( characters );

    }

    /* 存储字符。 */
    {

        const unicodes = fontcaster.convert( characters );
        const response = await fontcaster.write( unicodes, unicode_path );

        if ( ! response.success ) return { success: false, error: response.error };

    }

    /* 执行字体子集化。 */
    {

        const response = await fontcaster.subset( characters, origin_font_path, subset_font_path );

        if ( ! response.success ) return { success: false, error: response.error };

        return { success: true, information: response.information };

    }

}

module.exports = { subset };
