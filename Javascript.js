document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('signature-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 200;
    let isDrawing = false;

    let brushColor = '#000000';
    let brushSize = 5;

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    document.getElementById('text-color').addEventListener('input', changeBrushColor);
    document.getElementById('background-color').addEventListener('input', changeBackgroundColor);
    document.getElementById('brush-size').addEventListener('input', changeBrushSize);
    document.getElementById('clear-btn').addEventListener('click', clearCanvas);
    document.getElementById('save-btn').addEventListener('click', saveSignature);
    document.getElementById('download-btn').addEventListener('click', downloadSignature);
    document.getElementById('retrieve-btn').addEventListener('click', retrieveSignature);

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    function draw(e) {
        if (!isDrawing) return;
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }

    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }

    function changeBrushColor() {
        brushColor = this.value;
    }

    function changeBackgroundColor() {
        canvas.style.backgroundColor = this.value;
    }

    function changeBrushSize() {
        brushSize = parseInt(this.value);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function saveSignature() {
        localStorage.setItem('signature', canvas.toDataURL());
    }

    function downloadSignature() {
        const link = document.createElement('a');
        link.href = localStorage.getItem('signature');
        link.download = 'signature.png';
        link.click();
    }

    function retrieveSignature() {
        const savedSignature = localStorage.getItem('signature');
        if (savedSignature) {
            const img = new Image();
            img.src = savedSignature;
            img.onload = function () {
                ctx.drawImage(img, 0, 0);
            }
        } else {
            alert('No signature saved.');
        }
    }
});