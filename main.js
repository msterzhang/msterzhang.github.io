var myImage = document.querySelector('img');
myImage.onclick = function() {
    var mySrc = myImage.getAttribute('src');
    if(mySrc === 'http://p17.qhimg.com/t010f0ecdb5dd8c6148.jpg') {
      myImage.setAttribute ('src','http://p19.qhimg.com/t012672a53098d92a5d.jpg');
    } else if(mySrc === 'http://p19.qhimg.com/t012672a53098d92a5d.jpg') {
      myImage.setAttribute ('src','http://p16.qhimg.com/t015b4b451cd077e310.jpg');
    }
     else if(mySrc === 'http://p16.qhimg.com/t015b4b451cd077e310.jpg') {
      myImage.setAttribute ('src','http://p19.qhimg.com/t018d3617fc61cc8d42.jpg');
    }
      else if(mySrc === 'http://p19.qhimg.com/t018d3617fc61cc8d42.jpg') {
      myImage.setAttribute ('src','http://p16.qhimg.com/t01bb30218e3652972c.jpg');
    }
      else if(mySrc === 'http://p16.qhimg.com/t01bb30218e3652972c.jpg') {
      myImage.setAttribute ('src','http://p19.qhimg.com/t01c6de2abdaee86f4f.jpg');
    }
       
}
