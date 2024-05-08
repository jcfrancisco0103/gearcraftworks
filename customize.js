let canvas = new fabric.Canvas('tshirt-canvas');
let paintMode = false;

function togglePaintMode() {
    paintMode = !paintMode;
    if (paintMode) {
        canvas.isDrawingMode = true;
        updateBrushColor(document.getElementById("brush-color").value);
        canvas.freeDrawingBrush.width = parseInt(document.getElementById("brush-size").value, 10) || 1;
        canvas.selection = false; // Disable object selection in paint mode
    } else {
        canvas.isDrawingMode = false;
        canvas.selection = true; // Enable object selection
    }
}

document.getElementById("toggle-paint-mode").addEventListener("click", function() {
    togglePaintMode();
});

document.getElementById("tshirt-color").addEventListener("change", function(){
    document.getElementById("tshirt-div").style.backgroundColor = this.value;
    if (!paintMode) {
        updateBrushColor(document.getElementById("brush-color").value);
    }
}, false);

document.getElementById("brush-color").addEventListener("input", function() {
    updateBrushColor(this.value);
});

document.getElementById("brush-size").addEventListener("change", function(){
    if (paintMode) {
        canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
    }
}, false);

document.getElementById("delete-paint-btn").addEventListener("click", function() {
    deletePaint();
});

document.getElementById('tshirt-custompicture').addEventListener("change", function(e){
    var reader = new FileReader();
    
    reader.onload = function (event){
        var imgObj = new Image();
        imgObj.src = event.target.result;

        imgObj.onload = function () {
            var img = new fabric.Image(imgObj);

            img.scaleToHeight(300);
            img.scaleToWidth(300); 
            canvas.centerObject(img);
            canvas.add(img);
            canvas.renderAll();
        };
    };

    if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0]);
    }
}, false);

document.addEventListener("keydown", function(e) {
    var keyCode = e.keyCode;

    if(keyCode == 46){
        console.log("Removing selected element on Fabric.js on DELETE key !");
        canvas.remove(canvas.getActiveObject());
    }
}, false);

document.getElementById('add-text-btn').addEventListener('click', function() {
    var textInput = document.getElementById('text-input').value;
    var font = document.getElementById('font-select').value;
    var fontSize = parseInt(document.getElementById('font-size').value);

    var text = new fabric.Text(textInput, {
        fontFamily: font,
        fontSize: fontSize,
        left: 100,
        top: 100
    });

    canvas.add(text);
    canvas.renderAll();
});

function updateBrushColor(color) {
    canvas.freeDrawingBrush.color = color;
}

function deletePaint() {
    var objects = canvas.getObjects();
    var paintObjects = objects.filter(function(obj) {
        return obj.type === 'path';
    });
    paintObjects.forEach(function(obj) {
        canvas.remove(obj);
    });
    canvas.renderAll();
}
