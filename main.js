status = "";
objects = [];
results = "";
object_name="";

function setup() {
    canvas = createCanvas(600, 500);
    canvas.position(250, 350);
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
}

function start() {
    object_name=document.getElementById("name_holder").value;
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : detecting object";
}

function modelLoaded() {
    console.log("model loaded");
    status = true;
}
function draw() {
    image(video, 0, 0, 600, 500);
    if (status != "") {
        objectDetector.detect(video, gotResults);
        document.getElementById("status").innerHTML = "objects detected";
        var i ;
        for (i=0;i<objects.length;i++) {
            label = objects[i].label;
            percent = floor(objects[i].confidence * 100);
            text(label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == object_name) {
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("status").innerHTML = value + ":" + "found !";
                document.getElementById("result").innerHTML = "An object is detected !";
            }
        }
    }
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}