        const canvas = document.querySelector("#draw");
        console.log(canvas);

        const ctx = canvas.getContext("2d");
        console.log(ctx);


        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.strokeStyle = "lime";
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 10;
        //ctx.globalCompositeOperation = 'multiply'; // copy, xor, lighter

        // dummy variables
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;
        let hue = 0;
        let direction = true;

        canvas.addEventListener("mousedown", (ev) => {
            isDrawing = true;
            // this is called destructuring es6
            [lastX, lastY] = [ev.offsetX, ev.offsetY]
        });
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", () => isDrawing = false);
        canvas.addEventListener("mouseout", () => isDrawing = false);

        function draw(ev) {
            if (!isDrawing) return; // stop the function from running when they are not moused down 
            console.log(ev);
            ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
            ctx.beginPath();
            // start from
            ctx.moveTo(lastX, lastY);
            // go to
            ctx.lineTo(ev.offsetX, ev.offsetY);
            ctx.stroke();
            lastX = ev.offsetX;
            lastY = ev.offsetY;
            hue++;
            if (hue >= 360) {
                hue = 0;
            }

            if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
                direction = !direction;
            }

            if (direction) {
                ctx.lineWidth++;
                ctx.globalCompositeOperation = 'xor';
            } else {
                ctx.lineWidth--;
                ctx.globalCompositeOperation = 'lighter';
            }


        }