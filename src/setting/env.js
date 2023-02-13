let secretKey =''
if(process.env.SECRET_KEY !== undefined){
  secretKey = process.env.SECRET_KEY
}

export {secretKey}