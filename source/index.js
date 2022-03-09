import "/style/reset.css";

import "/style/main.css";

const top = createDiv( "top" );
const right = createDiv( "right" );
const bottom = createDiv( "bottom" );
const left = createDiv( "left" );
const front = createDiv( "front" );
const group = createDiv( "group" );

group.append( top, right, bottom, left, front );
document.body.append( group );

function createDiv( class_name ) {

    const div = document.createElement( "div" );

    div.className = class_name;

    return div;

}
