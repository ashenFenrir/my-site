
function init(canvas_id){
    const canvas = document.getElementById(canvas_id);
    const ctx = canvas.getContext('2d');

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    ctx.scale(dpr, dpr);

}


function draw() {
    const bg_canvas = document.getElementById("bg_canvas");
    const bg_ctx = bg_canvas.getContext("2d");
    const main_canvas = document.getElementById("canvas");
    const main_ctx = main_canvas.getContext("2d");

    const WIDTH = bg_canvas.width, HEIGHT = bg_canvas.height;

    let mouse_x = 0, mouse_y = 0, mouseDown = 0;

    main_canvas.onmousemove = function(e) {
        let rect = this.getBoundingClientRect();
        mouse_x = e.clientX - rect.left;
        mouse_y = e.clientY - rect.top;
    };

    document.body.onmousedown = function() { 
    ++mouseDown;
    }

    document.body.onmouseup = function() {
    --mouseDown;
    }


  function get_x(x, y){
    return WIDTH/n*(x+0.5*(y%2));
  }
  function get_y(x, y){
    return rad*y*1.5;
  }

  function draw_hexagon(x, y, radius, angle, fillStyle, strokeStyle, lineWidth, ctx, is_inside_pos={x:0, y:0}){
    // console.log(ctx);
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    let i = 0;
    ctx.moveTo(x+radius*Math.cos(Math.PI/3*(i-1)+angle), y+radius*Math.sin(Math.PI/3*(i-1)+angle));
    for(i = 0; i < 8; i++){
        ctx.lineTo(x+radius*Math.cos(Math.PI/3*i+angle), y+radius*Math.sin(Math.PI/3*i+angle));
    }
    let is_inside = ctx.isPointInPath(is_inside_pos.x, is_inside_pos.y);

    ctx.stroke();
    ctx.fill();

    return is_inside;
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
            
            this.is_hovering = false;
        }
    }

    class HexElement{
    constructor(x, y, text, radius, angle, style, hoverStyle){
        this.x = x;
        this.y = y;
        this.text = text;
        this.radius = radius;
        this.t_radius = radius;
        this.angle = angle;
        this.style = style;
        this.hoverStyle = hoverStyle;
        this.hoverCallback = () => {this.t_radius*=1.1;};
        this.mouseDownCallback = () => {console.log(this.text, mouseDown);};
    }

    applyShadowSettings(){

    }

    draw(){
        let style = this.style;
        main_ctx.shadowColor = "#000000";
        main_ctx.shadowOffsetX = 0;
        main_ctx.shadowOffsetY = 0;
        main_ctx.shadowBlur = 0;

        if(this.is_hovering){
            style = this.hoverStyle;
        main_ctx.shadowBlur = 10;
        }
        main_ctx.shadowBlur = 0;


       

        this.is_hovering = draw_hexagon(
            get_x(this.x, this.y), 
            get_y(this.x, this.y), 
            this.t_radius, 
            this.angle, 
            style.shape_fillStyle, 
            style.shape_strokeStyle, 
            style.shape_lineWidth,
            main_ctx,
            {x: mouse_x, y: mouse_y}
        );


        this.t_radius = this.radius;


        main_ctx.fillStyle = style.font_fillStyle;
        main_ctx.font = style.font;
        main_ctx.textAlign = 'center';
        main_ctx.textBaseline = 'middle';
        main_ctx.fillText(this.text, get_x(this.x, this.y), get_y(this.x, this.y));


        if(this.is_hovering){
            if(mouseDown){
                this.mouseDownCallback();
            } else{
                this.hoverCallback();
            }
        }

        return this.is_hovering & mouseDown;
    }
    }


    const n = 23;

    const rad = WIDTH/n/Math.cos(Math.PI/3/2)/2;

    for(let i = 0; i < n+1; i++){
    for(let j = 0; j < n; j++){

        draw_hexagon(get_x(i, j), get_y(i, j), rad, Math.PI/3/2, "#0a0c1075", "#202633", 1, bg_ctx);
    }
    }

    


    const big_hex_style = new HexStyle("rgb(54, 15, 99)", "#a195e5", 3, "20px Rajdhani, sans-serif", "#a195e591");
    const big_hex_hover_style = new HexStyle("rgb(54, 15, 99)", "#a195e594", 3, "20px Rajdhani, sans-serif", "#a195e591");
    const small_hex_hover_style = new HexStyle("rgb(54, 15, 99)", "#a195e594", 3, "11px Rajdhani, sans-serif", "#a195e591");
    const small_hex_style = new HexStyle("rgb(54, 15, 99)", "#a195e58c", 2, "11px Rajdhani, sans-serif", "#a195e5");

    const radius = rad*1.5/Math.cos(Math.PI/3/2);
    const angle = Math.PI;
    // const radius = rad*2;
    // const angle = Math.PI/6;

    const x = 12;
    const y = 10;

    const hex_coding = new HexElement(x, y, "coding", radius, angle, big_hex_style, big_hex_hover_style);    
    
    const hex_electronics = new HexElement(x+3, y, "electronics", radius, angle, big_hex_style, big_hex_hover_style);    
    
    const hex_biology = new HexElement(x-3, y, "biology", radius, angle, big_hex_style, big_hex_hover_style);    
    
    const hex_art = new HexElement(x-2, y-3, "art", radius, angle, big_hex_style, big_hex_hover_style);    
    
    const hex_cyber_security = new HexElement(x+1, y-3, "cyber\nsecurity", radius, angle, big_hex_style, big_hex_hover_style);    
    
    // const hex_editing = new HexElement(x, y-6, "editing", radius, angle, big_hex_style, big_hex_hover_style);    
    // hex_editing.draw();
    
    
    const hex_bioinformatics = new HexElement(x-2, y+1, "bioinformatics", rad, angle/6, small_hex_style, small_hex_hover_style);    
    
    const hex_animation = new HexElement(x-2, y-5, "animation", rad, angle/6, small_hex_style, small_hex_hover_style);    
    
    const hex_game_dev = new HexElement(x-3, y-2, "GameDev", rad, angle/6, small_hex_style, small_hex_hover_style);    
    
    const hex_engineering = new HexElement(x+1, y+1, "engineering", rad, angle/6, small_hex_style, small_hex_hover_style);    
    
    function draw_hex(){
        main_ctx.clearRect(0, 0, WIDTH, HEIGHT);
        hex_engineering.draw();
        hex_game_dev.draw();
        hex_animation.draw();
        hex_bioinformatics.draw();
        hex_cyber_security.draw();
        hex_art.draw();
        hex_biology.draw();
        hex_electronics.draw();
        hex_coding.draw();
        window.requestAnimationFrame(draw_hex);
    }
    draw_hex();
}
init("bg_canvas");
init("canvas");
draw();

