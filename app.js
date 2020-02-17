const fileReader = new FileReader();
const filterType = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
const photosArray = [];
fileReader.onload = function (event) {
  var image = new Image();
  
  photosArray.push(event.target.result);
  
  var imageCount = photosArray.length;
  var compImagePlace = '.commentImg' + imageCount;
  var originalPlace = '.originalImg' + imageCount
console.log(photosArray)

  image.onload = () => {
      $('.image-table').append('<tr><td>Original Img - <img class="originalImg' + imageCount + '"  alt="your image" /></td></tr>')
      $('.image-table').append('<tr><td>Compress Img - <img class="commentImg' + imageCount + '"  alt="your image" /></td></tr>')
      $(originalPlace)
      .attr('src',image.src);
      
      var canvas=document.createElement("canvas");
      var context=canvas.getContext("2d");
      canvas.width=image.width/4;
      canvas.height=image.height/4;
      context.drawImage(image,
          0,
          0,
          image.width,
          image.height,
          0,
          0,
          canvas.width,
          canvas.height
      );
      $(compImagePlace)
      .attr('src', canvas.toDataURL());
  }
  image.src=event.target.result;
};

var loadImageFile = function () {
  var uploadImage = document.getElementById("upload-Image");
  
  //check and retuns the length of uploded file.
  if (uploadImage.files.length === 0) { 
    return; 
  }
  
  //Is Used for validate a valid file.
  var uploadFile = document.getElementById("upload-Image").files[0];
  if (!filterType.test(uploadFile.type)) {
    alert("Please select a valid image."); 
    return;
  }
  
  fileReader.readAsDataURL(uploadFile);
}