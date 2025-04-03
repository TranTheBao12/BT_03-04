module.exports={
    CreateSuccessRes: function(res,statusCode,data){
        return res.status(statusCode).send({
            success:true,
            data:data
          })
    },
    //viet validator cho phuong thuc changepassowrd va login
    CreateErrorRes: function(res,statusCode,error){
        return res.status(statusCode).send({
            success:false,
            message:error.message
          })
    }
}