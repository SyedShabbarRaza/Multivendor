//create token and saving that in cookies

const sendShopToken=(seller,statusCode,res)=>{
    console.log("sendTokenmein")
    const token=seller.getJwtToken();

    //Options for cookies
    const options={
        expires:new Date(Date.now()+90*24*60*60*1000),  //Expires in 90 days 
        httpOnly:true,
    }
console.log("token::",token)
    res.status(statusCode).cookie("seller_token",token,options).json({
        success:true,
        seller,
        token,
    });
}
export default sendShopToken;