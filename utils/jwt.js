const jwt=require('jsonwebtoken')

function createToken(data){
    let token=jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),//过期时间
        data: data
    }, 'qf');
    // console.log(token)
    return token
}
module.exports={
    createToken
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTkxMDQ5NzUsImRhdGEiOnsidXNlcm5
// hbWUiOiJhYmMiLCJwYXNzd29yZCI6IjEyMyJ9LCJpYXQiOjE1OTkxMDEzNzV9.k8S6v_gWa33fQjrUnT
// IRqLmxNWGodClg8RiX7-5tmPM
