
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

function lerp(a, b, f)
{
    return a * (1.0 - f) + (b * f);
}


function draw() {
    const bg_canvas = document.getElementById("bg_canvas");
    const bg_ctx = bg_canvas.getContext("2d");
    const main_canvas = document.getElementById("canvas");
    const main_ctx = main_canvas.getContext("2d");

    const WIDTH = bg_canvas.width, HEIGHT = bg_canvas.height;
    
    main_ctx.clearRect(0, 0, WIDTH, HEIGHT);
    bg_ctx.clearRect(0, 0, WIDTH, HEIGHT);

    let mouse_x = 0, mouse_y = 0, mouseDown = 0;

    document.addEventListener('mousemove', e => {
        mouse_x = e.clientX;
        mouse_y = e.clientY;
    });

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
        this.hoverCallback = () => {this.t_radius=lerp(this.t_radius, this.radius*1.1, 0.1);};
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


        this.t_radius=lerp(this.t_radius, this.radius, 0.1);


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


    const n = Math.floor(WIDTH/100);
    console.log(n);

    const rad = WIDTH/n/Math.cos(Math.PI/3/2)/2;

    for(let i = 0; i < n+1; i++){
    for(let j = 0; j < n*2; j++){

        draw_hexagon(get_x(i, j), get_y(i, j), rad, Math.PI/3/2, "#0a0c1075", "#202633", 1, bg_ctx);
    }
    }

    


    const big_hex_style = new HexStyle("#0000004a", "#a195e5", 3, `${20/1980*WIDTH}px Rajdhani, sans-serif`, "#a195e591");
    const small_hex_style = new HexStyle("#0000004a", "#a195e58c", 2, `${11/1980*WIDTH}px Rajdhani, sans-serif`, "#a195e5");
    const big_hex_hover_style = new HexStyle("#00000096", "#a195e5", 3, `${20/1980*WIDTH}px Rajdhani, sans-serif`, "#a195e591");
    const small_hex_hover_style = new HexStyle("#00000096", "#a195e5", 3, `${11/1980*WIDTH}px Rajdhani, sans-serif`, "#a195e591");

    const radius = rad*1.5/Math.cos(Math.PI/3/2);
    const angle = Math.PI;
    // const radius = rad*2;
    // const angle = Math.PI/6;

    const x = Math.floor(n/2)+1;
    const y = 8;

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
    
    let dots = []
    for(let i = 0; i < WIDTH/5; i++){
        dots.push(
            {
                x: Math.floor(Math.random()*WIDTH),
                y: Math.floor(Math.random()*HEIGHT),
                xs: Math.random()*0.1-0.05,
                ys: Math.random()*0.1-0.05,
                dx: Math.floor(Math.random()*WIDTH),
                dy: Math.floor(Math.random()*HEIGHT),
            }
        );

    }
    function draw_dots(){
        const push_rad = WIDTH/10;
        
        main_ctx.strokeStyle = "#6464641a";
        main_ctx.beginPath();
        main_ctx.arc(mouse_x, mouse_y, push_rad, 0, 2 * Math.PI);
        main_ctx.stroke();

        connected_dots = [];

        let i = 0;
        dots.forEach(e => {
            
            
            e.x += e.xs;
            e.y += e.ys;
            
            
            if(e.x > WIDTH){
                
                e.x=e.x%WIDTH;
            }if(e.x < 0){

                e.x=WIDTH;
            }if(e.y > HEIGHT){
                
                e.y=e.y%HEIGHT;
            }if(e.y < 0){

                e.y=HEIGHT;
            }
            
            let d = (e.x-mouse_x)**2+(e.y-mouse_y)**2;
            
            e.xs=lerp(e.xs, e.xs/((e.xs**2+e.ys**2)**0.5)/5+(e.dx-e.x)/100000, 0.05);
            e.ys=lerp(e.ys, e.ys/((e.xs**2+e.ys**2)**0.5)/5+(e.dy-e.y)/100000, 0.05);

            if(d < push_rad**2){
                let f = -5/d;
                if(f>1) f = 1;
                e.xs+=f*(mouse_x-e.x);
                e.ys+=f*(mouse_y-e.y);
            }
            if(d < (push_rad*1.5)**2){

                main_ctx.fillStyle = "#24da002c";
                connected_dots.push(i);
            }
            else{

                main_ctx.fillStyle = "#24da0015";
            }
            main_ctx.beginPath();
            main_ctx.arc(e.x, e.y, 3, 0, 2 * Math.PI);
            main_ctx.fill();
            i++;
        });

        connected_dots.forEach(i => {
            connected_dots.forEach(j => {
                if((dots[i].x-dots[j].x)**2+(dots[i].y-dots[j].y)**2 < 60**2){
                    
                    main_ctx.lineWidth = 1;
                    main_ctx.strokeStyle = "#17520069";
                    main_ctx.beginPath();
                    main_ctx.moveTo(dots[i].x, dots[i].y);
                    main_ctx.lineTo(dots[j].x, dots[j].y);
                    main_ctx.stroke();
                }
            });
        });
    }

    function draw_hex(){
        main_ctx.clearRect(0, 0, WIDTH, HEIGHT);

        draw_dots();

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
document.addEventListener('onresize', (event) => {


});

window.addEventListener('resize', function(event) {
    console.log("resize");
    window.location.reload();
}, true);

init("bg_canvas");
init("canvas");
draw();

