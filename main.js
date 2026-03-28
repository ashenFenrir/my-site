
function init(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // 1. Get the pixel ratio and the desired display size
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // 2. Set the "actual" internal resolution
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // 3. Set the "visual" display size via CSS
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // 4. Scale the context to draw in CSS-sized units
    ctx.scale(dpr, dpr);

    // Now drawing at (10, 10) will be sharp on all displays
    //ctx.fillRect(10, 10, 50, 50);
}

function draw() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const WIDTH = canvas.width, HEIGHT = canvas.height;


  function get_x(x, y){
    return WIDTH/n*(x+0.5*(y%2));
  }
  function get_y(x, y){
    return rad*y*1.5;
  }

  function draw_hexagon(x, y, radius, angle, fillStyle, strokeStyle, lineWidth){
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    let i = 0;
    ctx.moveTo(x+radius*Math.cos(Math.PI/3*(i-1)+angle), y+radius*Math.sin(Math.PI/3*(i-1)+angle));
    for(i = 0; i < 8; i++){
        ctx.lineTo(x+radius*Math.cos(Math.PI/3*i+angle), y+radius*Math.sin(Math.PI/3*i+angle));
    }
    ctx.stroke();
    ctx.fill();
    }

    class HexStyle{
        constructor(
            shape_fillStyle,
            shape_strokeStyle,
            shape_lineWidth,
            font,
            font_fillStyle
        ){
            this.shape_fillStyle = shape_fillStyle;
            this.shape_strokeStyle = shape_strokeStyle;
            this.shape_lineWidth = shape_lineWidth;
            this.font = font;
            this.font_fillStyle = font_fillStyle;

        }
    }

    class HexElement{
    constructor(x, y, text, radius, angle, style){
        this.x = x;
        this.y = y;
        this.text = text;
        this.radius = radius;
        this.angle = angle;
        this.style = style;

    }
    draw(){
        draw_hexagon(
            get_x(this.x, this.y), 
            get_y(this.x, this.y), 
            this.radius, 
            this.angle, 
            this.style.shape_fillStyle, 
            this.style.shape_strokeStyle, 
            this.style.shape_lineWidth);

        ctx.fillStyle = this.style.font_fillStyle;
        ctx.font = this.style.font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, get_x(this.x, this.y), get_y(this.x, this.y));
    }
    }


    const n = 23;
    // for (let i = 0; i < n; i++) {
    //     ctx.beginPath();
    //     ctx.moveTo(WIDTH/n*i, 0);
    //     ctx.lineTo(WIDTH/n*i, 20);
    //     ctx.stroke();
    // }
    

    const rad = WIDTH/n/Math.cos(Math.PI/3/2)/2;

    for(let i = 0; i < n+1; i++){
    for(let j = 0; j < n; j++){

        draw_hexagon(get_x(i, j), get_y(i, j), rad, Math.PI/3/2, "#0a0c1075", "#202633", 1);
    }
    }

    

    
    const big_hex_style = new HexStyle("#3219c27e", "#a195e594", 3, "20px Rajdhani, sans-serif", "#a195e591");
    const small_hex_style = new HexStyle("#3219c279", "#a195e58c", 2, "11px Rajdhani, sans-serif", "#a195e5");

    const radius = rad*1.5/Math.cos(Math.PI/3/2);
    const angle = Math.PI;
    // const radius = rad*2;
    // const angle = Math.PI/6;

    const x = 12;
    const y = 10;

    const hex_coding = new HexElement(x, y, "coding", radius, angle, big_hex_style);    
    hex_coding.draw();

    const hex_electronics = new HexElement(x+3, y, "electronics", radius, angle, big_hex_style);    
    hex_electronics.draw();

    const hex_biology = new HexElement(x-3, y, "biology", radius, angle, big_hex_style);    
    hex_biology.draw();

    const hex_art = new HexElement(x-2, y-3, "art", radius, angle, big_hex_style);    
    hex_art.draw();

    const hex_cyber_security = new HexElement(x+1, y-3, "cyber\nsecurity", radius, angle, big_hex_style);    
    hex_cyber_security.draw();

    const hex_editing = new HexElement(x, y-6, "editing", radius, angle, big_hex_style);    
    hex_editing.draw();


    const hex_bioinformatics = new HexElement(x-2, y+1, "bioinformatics", rad, angle/6, small_hex_style);    
    hex_bioinformatics.draw();

    const hex_animation = new HexElement(x-2, y-5, "animation", rad, angle/6, small_hex_style);    
    hex_animation.draw();

    const hex_game_dev = new HexElement(x-3, y-2, "GameDev", rad, angle/6, small_hex_style);    
    hex_game_dev.draw();

    const hex_engineering = new HexElement(x+1, y+1, "engineering", rad, angle/6, small_hex_style);    
    hex_engineering.draw();

    
}
init();
draw();