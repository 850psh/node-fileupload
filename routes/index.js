var util = require('util')
    , fs = require('fs');
    
exports.index = function(req, res){
    res.render('index', { title: 'Express'});
};

exports.test = function(req, res){
    res.render('test', { title: 'Upload Test'});
};

exports.upload = function(req, res){    
    console.log('-> upload was called\n\n');
    console.log('-> ' +  util.inspect(req.files));        
    var images = [];
    var isImage = false;
    
    if (Array.isArray(req.files.imgs)){
        req.files.imgs.forEach(function(image){
            var kb = image.size / 1024 | 0;
            isImage = checkType(image);
            images.push({name: image.name, size: kb, isImage: isImage});
            renameImg(image);
            console.log('->> isImage: ' + isImage );
        });  
    }else{
        var image = req.files.imgs;
        var kb = image.size / 1024 | 0;
        isImage = checkType(image);
        images.push({name: image.name, size: kb, isImage: isImage});
        renameImg(image);
        console.log('->> isImage: ' + isImage );
    }
    
    console.log('->> render');
    res.render('show', { title: 'Show'
                            ,images: images
    });
};

function checkType(image){
    var isImage = false;
    console.log('->> image.type.indexOf : ' + image.type.indexOf('image'));
    
    if(image.type.indexOf('image') > -1){
        console.log('->>> req.files.img is img');
        isImage = true;
    }else{
        console.log('->>> req.files.img is not img');
        isImage = false;
    }
    return isImage;
}

function renameImg(image){
    var tmp_path = image.path;
    var target_path = './public/images/' + image.name;
    console.log('->> tmp_path: ' + tmp_path );
    console.log('->> target_path: ' + target_path );
            
    fs.rename(tmp_path, target_path, function(err){
        if(err) throw err;
        
        console.log('->> upload done');
    });
}