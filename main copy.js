
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
    }
    }


    const n = 20;
    for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.moveTo(WIDTH/n*i, 0);
        ctx.lineTo(WIDTH/n*i, 20);
        ctx.stroke();
    }
    
    const rad = WIDTH/n/Math.cos(Math.PI/3/2)/2;
    
    const hex_style = new HexStyle();

    const hex_coding = new HexElement(9, 4, "coding", rad, )    

}
init();
draw();