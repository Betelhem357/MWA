module.exports.addParameters = (req , res)=>{

    console.log("I am Get request :)!");
    //console.log(req.params['first_num']);
    const first_number = parseInt(req.params['first_num']);
    const second_number = parseInt(req.query.second_num);
    //console.log(first_number+second_number);
    res.status(200).json({result:first_number+second_number});
    //res.status(200).sendFile(path.join(__dirname,"index.js"));
 };