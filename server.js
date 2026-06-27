const express=require('express')
const mongoose=require('mongoose')
const path=require('path')
const port=3019

const app=express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/project')
const db=mongoose.connection
db.once('open',()=>{
    console.log("Mongo db connection succesfull..")
})


const userSchema =new mongoose.Schema({
    medicineName: String,
    companyName: String,
    price: Number,
    quantity: Number,
    expirationDate: Date
})

const Users=mongoose.model("data",userSchema)


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.get('/view', async (req, res) => {
    const data = await Users.find();
    res.json(data);
});

app.post('/post',async(req,res)=>{
    const {medicineName,companyName,price,quantity,expirationDate}=req.body
    const user=new Users({
         medicineName,
         companyName,
         price,
         quantity,
         expirationDate
        
    })
    await user.save()
    console.log(user)
    res.send("Form submission succesfull")


})
app.listen(port,()=>{
    console.log("Server satrted!!..")
})
//update
app.post('/update', async (req, res) => {
    const { medicineName, price, quantity, expirationDate } = req.body;

    const result = await Users.updateOne(
        { medicineName: medicineName },   // condition
        {
            $set: {
                price: price,
                quantity: quantity,
                expirationDate: expirationDate
            }
        }
    );

    if (result.modifiedCount > 0) {
        res.send("Medicine updated successfully");
    } else {
        res.send("Medicine not found");
    }
});
//delete
app.post('/delete', async (req, res) => {
    const { medicineName } = req.body;

    const result = await Users.deleteOne({ medicineName: medicineName });

    if (result.deletedCount > 0) {
        res.send("Medicine deleted successfully");
    } else {
        res.send("Medicine not found");
    }
});
