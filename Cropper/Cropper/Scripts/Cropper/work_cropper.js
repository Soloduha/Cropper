$(function () {
    var MyCropper;
    var isHorizontalInv = false, isVerticalInv=false;
    console.log("------", "Begin work cropper");
    $("#imageContainerPlus").on('click', function () {
        var inputFile = $('<input/>')
            .attr('type', 'file')
            .attr('name', 'img_file')
            .attr('id', 'img_file')
            .attr('class', 'hide')

        var fileUploadContainer = $("#fileUploadContainer");

        fileUploadContainer.html("");

        fileUploadContainer.html(inputFile);
        inputFile.click();

        inputFile.on('change', function () {
            if (this.files && this.files[0]) {
                if (this.files[0].type.match(/^image\//)) {
                    uploadFileCropper(this.files[0]);

                }
                else {
                    alert("invalid image type");
                }
            }
            else {
                alert("upload file please");
            }
        });
    });

    function uploadFileCropper(fileName) {
        console.log("--Upload file--", fileName);
        var $canvas = $("#canvas");
        context = $canvas.get(0).getContext('2d');

        MyCropper = $canvas;

        var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();
            img.onload = function () {
                context.canvas.width = img.width;
                context.canvas.height = img.height;

                document.body.classList.toggle("open");
                $(".containerCrop").show();
                $(".navbar").hide();

                context.drawImage(img, 0, 0);
                $canvas.cropper('destroy').cropper({
                    aspectRatio: 1 / 1,
                    minCropBoxWidth: 300,
                    minCropBoxHeight:  300
                });
            }
            img.src = e.target.result;
        }

        reader.readAsDataURL(fileName);
    }

    $("#rotateLeft").click(function () {
        MyCropper.cropper('rotate', -45);
    });

    $("#rotateRight").click(function () {
        MyCropper.cropper('rotate', 45);
    });

    $("#moveLeft").click(
        function () {
            MyCropper.cropper('move', -10, 0);
        }
    )

    $("#moveRight").click(
        function () {
            MyCropper.cropper('move', 10, 0);
        }
    )

    $("#zoomPlus").click(
        function () {
            MyCropper.cropper('zoom', 0.1);
        }
    )

    $("#zoomMinus").click(
        function () {
            MyCropper.cropper('zoom', -0.1);
        }
    )

    $("#moveUp").click(
        function () {
            MyCropper.cropper('move', 0, -10);
        }
    )

    $("#moveDown").click(
        function () {
            MyCropper.cropper('move', 0, 10);
        }
    )

    $("#scaleX").click(
        function () {
            if (isHorizontalInv == false) {
                MyCropper.cropper('scaleX', -1);
                isHorizontalInv = true;
            }
            else {
                MyCropper.cropper('scaleX', 1);
                isHorizontalInv = false;
            }
        }
    )

    $("#scaleY").click(
        function () {
            if (isVerticalInv == false) {
                MyCropper.cropper('scaleY', -1);
                isVerticalInv = true;
            }
            else {
                MyCropper.cropper('scaleY', 1);
                isVerticalInv = false;
            }
        }
    )
})