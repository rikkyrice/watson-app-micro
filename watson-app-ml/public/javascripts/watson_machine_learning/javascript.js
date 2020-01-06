var g_mouse_is_down = false; // Used to draw the image on the canvas
var g_prev_pixel_X  = -1;    //
var g_prev_pixel_Y  = -1;    //
var g_line_width = 5;       //

var g_min_X = 365.5;           // Tracking the minimum/maximum mouse position
var g_min_Y = 365.5;           // on the canvas makes it simple to create a
var g_max_X = 0;             // bounding box around the drawn digit
var g_max_Y = 0;             //

var g_saved_digit = null;    // After an image has been sent to a deployment
                             // if a different deployment type is selected,
                             // reload the original drawn digit to resend to
                             // the other deployment type
var number = [];
var num = 0;
var operator = [];
var dotFlag = false;
var dotCount = 1;
var convertPFlag = false;
var pmFlag = false;

function start_drawing(e)
{
    g_mouse_is_down = true;
    g_prev_pixel_X = e.clientX - document.getElementById( 'drawing_box' ).getBoundingClientRect().left;
    g_prev_pixel_Y = e.clientY - document.getElementById( 'drawing_box' ).getBoundingClientRect().top;
}


function stop_drawing(e)
{
    g_mouse_is_down = false;
    saveImage();
}


function draw_line(e)
{
    if( ( g_mouse_is_down ) && ( g_prev_pixel_X > -1 ) && ( g_prev_pixel_Y > -1 ) )
    {
        pixel_X = e.clientX - document.getElementById( 'drawing_box' ).getBoundingClientRect().left;
        pixel_Y = e.clientY - document.getElementById( 'drawing_box' ).getBoundingClientRect().top;

        var ctx = document.getElementById( 'drawing_box' ).getContext( '2d' );
        ctx.strokeStyle = "black";
        ctx.lineWidth = g_line_width;
        ctx.beginPath();
        ctx.moveTo( g_prev_pixel_X, g_prev_pixel_Y );
        ctx.lineTo( pixel_X, pixel_Y );
        ctx.stroke();

        g_prev_pixel_X = pixel_X;
        g_prev_pixel_Y = pixel_Y;

        if( pixel_X < g_min_X ){ g_min_X = pixel_X; }
        if( pixel_X > g_max_X ){ g_max_X = pixel_X; }
        if( pixel_Y < g_min_Y ){ g_min_Y = pixel_Y; }
        if( pixel_Y > g_max_Y ){ g_max_Y = pixel_Y; }
    }
}


function clearCanvas()
{
    var canvas = document.getElementById( 'drawing_box' );
    var ctx = canvas.getContext( '2d' );
    ctx.clearRect( 0, 0, canvas.width, canvas.height );
}


function clearPayloadDiv()
{
    document.getElementById( 'payload_pre' ).innerHTML = "";
    document.getElementById( 'payload_spinner' ).style.display = "none";
}


function populatePayloadDiv( payload )
{
    document.getElementById( 'payload_spinner' ).style.display = 'none';
    document.getElementById( 'payload_pre' ).innerHTML = JSON.stringify( payload, null, 3 );
}


function clearResultsDiv()
{
    document.getElementById( 'results_pre' ).innerHTML = "";
    document.getElementById( 'results_spinner' ).style.display = "none";
}


function populateResultsDiv( result )
{
    document.getElementById( 'results_spinner' ).style.display = 'none';
    document.getElementById( 'results_pre' ).innerHTML = result;
}


function resetGlobalVars()
{
    g_mouse_is_down = false;
    g_prev_pixel_X  = -1;
    g_prev_pixel_Y  = -1;
    g_min_X = document.getElementById( 'drawing_box' ).height;
    g_min_Y = document.getElementById( 'drawing_box' ).width;
    g_max_X = 0;
    g_max_Y = 0;
}


function resetUI()
{
    clearCanvas();
    clearPayloadDiv();
    clearResultsDiv();
    document.getElementById( 'submit_button' ).title = 'Submit current drawing for analysis';
}


function clear_everything()
{
    resetUI();

    resetGlobalVars();

    g_saved_digit = null;
}


function saveImage()
{
    var canvas = document.getElementById( 'drawing_box' );
    var ctx = canvas.getContext( '2d' );
    g_saved_digit = ctx.getImageData( 0, 0, canvas.width, canvas.height );
}


function revertImage()
{
    resetUI();

    var ctx = document.getElementById( 'drawing_box' ).getContext( '2d' );
    ctx.putImageData( g_saved_digit, 0, 0 );
}


function submit_drawing()
{
    if( null !== document.getElementById( 'submit_button' ).title.match( /clear/i ) )
    {
        alert( "Click 'Clear' to clean the canvas and start again." );
        return;
    }

    // document.getElementById('check').innerHTML = document.getElementById( 'drawing_box' ).height;

    document.getElementById( 'submit_button' ).title = "Click 'Clear' to clean the canvas and start again";

    document.getElementById( 'payload_spinner' ).style.display = 'block';

    digit_img = get_bounding_box();

    // Note: The timeouts here are just to gradually show the
    // progression of preprocessing steps in the UI
    setTimeout( function()
    {
        [ centered_img, box_X, box_Y ] = center( digit_img );

        var deployment_type = "sendtofunction";

        var payload = { "values" : [ { "height" : centered_img.height, "data" : [ Array.from( centered_img.data ) ] } ] };

        populatePayloadDiv( payload );

        sendPayloadToDeployment( payload );

    }, 1000 );
}


function drawRedBox( x, y, width, height )
{
    var ctx = document.getElementById( 'drawing_box' ).getContext( '2d' );
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect( x, y, width, height );
    ctx.stroke();
}

function get_bounding_box()
{
    min_X  = g_min_X - g_line_width/2;
    min_Y  = g_min_Y - g_line_width/2;
    width  = g_max_X - g_min_X + g_line_width;
    height = g_max_Y - g_min_Y + g_line_width;

    var ctx = document.getElementById( 'drawing_box' ).getContext( '2d' );
    var digit_img = ctx.getImageData( min_X, min_Y, width, height );

    // Use a red box to show what's going on
    drawRedBox( min_X, min_Y, width, height );

    return digit_img;
}


function center( digit_img )
{
    var canvas = document.getElementById( 'drawing_box' );
    var ctx = canvas.getContext( '2d' );

    // Center the digit on the canvas
    var digit_min_X = canvas.width/2  - digit_img.width/2;
    var digit_min_Y = canvas.height/2 - digit_img.height/2;
    clearCanvas();
    ctx.beginPath();
    ctx.putImageData( digit_img, digit_min_X, digit_min_Y );

    // Get a square bounding box
    var max_dimension = ( digit_img.height > digit_img.width ) ? digit_img.height : digit_img.width;
    var square_box_min_X = canvas.width/2  - max_dimension/2;
    var square_box_min_Y = canvas.height/2 - max_dimension/2;
    centered_img = ctx.getImageData( square_box_min_X, square_box_min_Y, max_dimension, max_dimension );

    // Use a red box to show what's going on
    drawRedBox( square_box_min_X - 2, square_box_min_Y - 2, max_dimension + 4, max_dimension + 4 );

    return [ centered_img, square_box_min_X, square_box_min_Y ];
}


function processresultHandler( result )
{
    if( "digit_class" in result )
    {
        // This is what's returned by the sample function deployment
        var func_result = document.getElementById( 'results_pre' ).innerHTML = result["digit_class"];
        document.getElementById( 'result' ).textContent += func_result;
        num += num*10 + func_result;
        populateResultsDiv( func_result );
    }
    else
    {
        var err_str = JSON.stringify( result, null, 3 );
        populateResultsDiv( err_str );
        alert( err_str );
    }

}

function digits_tab(){
  document.getElementById('digits_tab').style.borderBottom = '20px solid rgb(245, 164, 49)';
  document.getElementById('digits_tab').style.color = '#142835';
  document.getElementById('digits_tab').style.zIndex = 2;
  document.getElementById('digits').style.display = 'grid';
  document.getElementById('canvas_div').style.display = 'none';
  document.getElementById('canvas_tab').style.borderBottom = '20px solid rgb(193, 180, 160)';
  document.getElementById('canvas_tab').style.color = '#999';
  document.getElementById('canvas_tab').style.zIndex = 1;
}
function canvas_tab(){
  document.getElementById('canvas_tab').style.borderBottom = '20px solid rgb(245, 164, 49)';
  document.getElementById('canvas_tab').style.color = '#142835';
  document.getElementById('canvas_tab').style.zIndex = 2;
  document.getElementById('canvas_div').style.display = 'block';
  document.getElementById('digits').style.display = 'none';
  document.getElementById('digits_tab').style.borderBottom = '20px solid rgb(193, 180, 160)';
  document.getElementById('digits_tab').style.color = '#999';
  document.getElementById('digits_tab').style.zIndex = 1;
}

function getDigit(obj){
  document.getElementById( 'result' ).textContent += obj.textContent;
  if(dotFlag){
    // document.getElementById( 'result' ).textContent = "ぱいぱい";
    num = num + Number(obj.textContent)*(0.1**dotCount);
    dotCount += 1;
  }else if(pmFlag){
    num = num*10 - Number(obj.textContent);
  }else{
    num = num*10 + Number(obj.textContent);
  }
  // document.getElementById( 'result' ).textContent = obj.textContent;
}
function clearOperator(){
  operator.length = 0;
}
function clearDot(){
  dotFlag = false;
  dotCount = 1;
}
function clearNumber(){
  number.length = 0;
  pmFlag = false;
}
function clearAll(){
  document.getElementById( 'result' ).textContent = "";
  convertPFlag = false;
  pmFlag = false;
  num = 0;
  clearDot();
  clearNumber();
  clearOperator();
}
function plusDigit(){
  document.getElementById( 'result' ).textContent += "+";
  number.push(num);
  num = 0;
  pmFlag = false;
  clearDot();
  operator.push("+");
}
function minusDigit(){
  document.getElementById( 'result' ).textContent += "-";
  number.push(num);
  num = 0;
  pmFlag = false;
  clearDot();
  operator.push("-");
}
function multiDigit(){
  document.getElementById( 'result' ).textContent += "×";
  number.push(num);
  num = 0;
  pmFlag = false;
  clearDot();
  operator.push("*");
}
function dividDigit(){
  document.getElementById( 'result' ).textContent += "÷";
  number.push(num);
  num = 0;
  pmFlag = false;
  clearDot();
  operator.push("/");
}
function addDot(){
  document.getElementById( 'result' ).textContent += ".";
  dotFlag = true;
}
function convertP(){
  if(convertPFlag){
    num = num*100;
    convertPFlag = false;
  }else{
    num = num/100;
    convertPFlag = true;
  }
  document.getElementById( 'result' ).textContent = num;
}
function convertPM(){
  document.getElementById( 'result' ).textContent = "";
  num = num*(-1);
  pmFlag = true;
  for(var i=0; i<number.length; i++){
    document.getElementById( 'result' ).textContent += number[i];
    document.getElementById( 'result' ).textContent += operator[i];
  }
  document.getElementById( 'result' ).textContent += num;
}

function equalDigit(){
  number.push(num);
  num = 0;
  clearDot();
  var result = 0;
  for(var i=0; i<operator.length; i++){
    if(operator[i] == '+'){
      result = number[0] + number[1];
      number.shift();
      number.shift();
      number.unshift(result);
    }
    if(operator[i] == '-'){
      result = number[0] - number[1];
      number.shift();
      number.shift();
      number.unshift(result);
    }
    if(operator[i] == '*'){
      result = number[0] * number[1];
      number.shift();
      number.shift();
      number.unshift(result);
    }
    if(operator[i] == '/'){
      result = number[0] / number[1];
      number.shift();
      number.shift();
      number.unshift(result);
    }
  }
  document.getElementById( 'result' ).textContent = result;
  clearOperator();
  clearNumber();
  num = result;
}
