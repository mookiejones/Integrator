var Upload=function(file){
    this.file=file;
}
Upload.prototype.getType = function() {
    return this.file.type;
};
Upload.prototype.getSize = function() {
    return this.file.size;
};
Upload.prototype.getName = function() {
    return this.file.name;
};
Upload.prototype.doUpload = function () {
    var that = this;
    var formData = new FormData();

    // add assoc key values, this will be posts values
    formData.append("file", this.file, this.getName());
    formData.append("upload_file", true);

    $.ajax({
        type: "POST",
        url: "script",
        xhr: function () {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                myXhr.upload.addEventListener('progress', that.progressHandling, false);
            }
            return myXhr;
        },
        success: function (data) {
            // your callback here
        },
        error: function (error) {
            // handle error
        },
        async: true,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        timeout: 60000
    });
};

Upload.prototype.progressHandling = function (event) {
    var percent = 0;
    var position = event.loaded || event.position;
    var total = event.total;
    var progress_bar_id = "#progress-wrp";
    if (event.lengthComputable) {
        percent = Math.ceil(position / total * 100);
    }
    // update progressbars classes so it fits your code
    $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
    $(progress_bar_id + " .status").text(percent + "%");
};


var ignoredfiles=[
    "SET",
 "DELETEME=-BCKED",
 "-BCKEDT-",
 "MOV_HOME",
 "endjob",
 "userpage",
 "abortit",
 "listmenu",
 "statpageg",
 "userclr",
 "sendsysv",
 "sendevnt",
 "grippart",
 "promptyn",
 "userclr",
 "vacuumon",
 "vacuumof",
 "thk_tol",
 "tchk_skp",
 "thk_sev",
 "abortit",
 "getdata",
 "thk_val",
 "mov_home",
 "reqmenu",
 "tprec",
 "PROMPTYN",
 "LISTMENU",
 "GETDATA",
 "SENDEVNT",
 "THK_SEV",
 "REQMENU",
 "SENDDATA",
 "SETVALVE",
 "USERPAGE",
 "VACUUMON",
 "-BCKED1-",
 "-BCKED3-",
 "-BCKED4-",
 "-BCKED5-",
 "-BCKED2-",
 "-BCKED9-",
 "-BCKED8-",
 "PROMPTOK",
 "THK_TOL",
 "USERCLR",
 "-BCKED",
 "-BCKEDT-",
 "MOV_HOME",
 "endjob",
 "userpage",
 "abortit",
 "listmenu",
 "statpageg",
 "userclr",
 "sendsysv",
 "sendevnt",
 "grippart",
 "promptyn",
 "userclr",
 "vacuumon",
 "vacuumof",
 "thk_tol",
 "tchk_skp",
 "thk_sev",
 "abortit",
 "getdata",
 "thk_val",
 "mov_home",
 "reqmenu",
 "tprec",
 "PROMPTYN",
 "LISTMENU",
 "GETDATA",
 "SENDEVNT",
 "THK_SEV",
 "REQMENU",
 "SENDDATA",
 "SETVALVE",
 "USERPAGE",
 "VACUUMON",
 "-BCKED1-",
 "-BCKED3-",
 "-BCKED4-",
 "-BCKED5-",
 "-BCKED2-",
 "-BCKED9-",
 "-BCKED8-",
 "PROMPTOK",
 "THK_TOL",
 "USERCLR",
 "VACOFFCK"

];
 
// public/js/controllers/NerdCtrl.js
angular.module('FileCtrl', []).controller('FileController', function($scope,$http,upload) {
    
    var that=$http;
    $scope.acceptTypes=".zip";
   


    $scope.tagline = 'Files Files Files!';
    $scope.myTxt = "You have not yet clicked submit";
    $scope.filenames=[ "SET","DELETEME=-BCKED","-BCKEDT-","MOV_HOME","endjob","userpage","abortit","listmenu","statpageg","userclr","sendsysv","sendevnt","grippart","promptyn","vacuumon","vacuumof","thk_tol","tchk_skp","thk_sev","getdata","thk_val","mov_home","reqmenu","tprec","PROMPTYN","LISTMENU","GETDATA","SENDEVNT","THK_SEV","REQMENU","SENDDATA","SETVALVE","USERPAGE","VACUUMON","-BCKED1-","-BCKED3-","-BCKED4-","-BCKED5-","-BCKED2-","-BCKED9-","-BCKED8-","PROMPTOK","THK_TOL","USERCLR","-BCKED","VACOFFCK"];
 
    
    $scope.add = function(){
       console.log('add');
        var f = document.getElementById('file').files[0];
        var formData=new FormData();
        formData.append('file',f);
        $http.post('/api/files',formData);
 
    }


    var sendFile=function(file){

        console.log('send');
        $http.post('/api/file',file)
            .then(result=>{
                debugger;
            })
            .catch(err=>{
                debugger;
            })

        $scope.myTxt="Sending "+file.name;
       var formData = new FormData();

    // add assoc key values, this will be posts values
        formData.append("file", file, file.name);
        formData.append("upload_file", true);
     
//        var upload=new Upload(file);
//        upload.doUpload();
        debugger;

    }
    $scope.doUpload = function (file) {
        console.log('doUpload')
        upload({
        url: '/upload',
        method: 'POST',
        data: {
            anint: 123,
            aBlob:new Blob([1,2,3]), // Only works in newer browsers
            aFile: $scope.myFile, // a jqLite type="file" element, upload() will extract all the files from the input and put them into the FormData object before sending.
        }
        }).then(
        function (response) {
            console.log(response.data); // will output whatever you choose to return from the server on a successful upload
        },
        function (response) {
            console.error(response); //  Will return if status code is above 200 and lower than 300, same as $http
        }
        );
  }
    $scope.uploadFile=function(file){
        console.log('uploading file');
        var formData = new FormData();
        formData.append('file',file);
        $http.post('/api/files',formData)
            .then(result=>{
                debugger;
            })
            .catch(err=>{
                debugger;
            })
      
    }
    $scope.submit =  function(e){
        console.log('submit');
        var target=e.currentTarget;
        console.log('submitting');
        $http.post('/api/files',target)
            .then(result=>{
                debugger;
            })
            .catch(err=>{
                debugger;
            })
             
    }
});