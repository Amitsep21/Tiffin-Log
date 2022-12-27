const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const multer = require("multer");

const db = require("./models");
const { Users } = require("./models");

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("./JWT");

app.use(express.json());
app.use(cookieParser());

app.use("/assets", express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "/public")));

// multer (route to upload images to server)
var imagename = "";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        console.log(file);

        imagename = Date.now() + path.extname(file.originalname) + "";
        console.log(imagename);
        cb(null, imagename);
    },
});
const fileFilter = (req, file, cb) => {
    console.log("Filter for file");
    if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

//create connection
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tiffin_service",
});
//connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log("mysql Connected...");
});

//route to sign_up
app.post("/sign_up", (req, res) => {
    let data = {
        username: req.body.username,
        password: req.body.password,
        mobileno: req.body.mobileno,
        email: req.body.email,
        category: req.body.category,
        city: req.body.city,
        address: req.body.address,
    };
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: req.body.username,
            password: hash,
        })
            .then(() => {
                res.json("USER REGISTERED");
            })
            .catch((err) => {
                if (err) {
                    res.status(400).json({ error: err });
                }
            });
    });
    console.log(data);
    console.log(data.category);
    let sql = "INSERT INTO sign_up SET ?";
    conn.query(sql, data, (err, result) => {
        if (err) throw err;
    });
    // res.redirect('/');
});

// route for add tiffin details
app.post("/saveitem", upload.single("file"), (req, res) => {
    let data = {
        item_name: req.body.itemname,
        item_details: req.body.details,
        item_price: req.body.price,
        item_image: imagename,
        item_category: req.body.foodtype,
        userid: req.body.name
    };
    console.log(data);
    console.log(req.body.file);
    let sql = "INSERT INTO tiffin_details SET ?";
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (!user) res.status(400).json({ error: "User Doesn't Exist" });

    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
        if (!match) {
            res
                .status(400)
                .json({ error: "Wrong Username and Password Combination!" });
        } else {
            const accessToken = createTokens(user);

            res.cookie("access-token", accessToken, {
                maxAge: 60 * 60 * 24 * 30 * 1000,
                httpOnly: true,
            });

            res.json("LOGGED IN");
        }
    });
});

//route for show data
app.post("/showitem", (req, res, err) => {
    // console.log(req.body);
    const name = req.body.nm;
    // console.log("youe s=="+name);
    let sql = "SELECT * FROM tiffin_details where userid='" + name + "'";
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// route to delete from data
app.post("/itemdelete/:id", function (req, res) {
    const id = req.params.id;
    console.log(id);
    let sql = "Delete FROM tiffin_details WHERE id=" + id;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect("/showitem");
    });
});

//route for edit data
app.get("/itemedit/:id", function (req, res) {
    const id = req.params.id;
    console.log(id);
    let sql = "SELECT * FROM tiffin_details WHERE id=" + id;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.json(results);
    });
});

// //route to update the item
app.post("/updateitem", upload.single("file"), (req, res, err) => {
    let sql = "update tiffin_details set item_name='" + req.body.itemname + "',item_price=" + req.body.price + ",item_details='" + req.body.details + "', item_category='" + req.body.foodtype + "',item_image='" + imagename + "'  where id=" + req.body.id;
    // console.log(upload.single("file"));
    // console.log(err);
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect("/showitem");
    });
});

//route for show data
app.get("/provider", (req, res) => {
    let sql = "SELECT * FROM sign_up where category='provider'";
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// //route to update the item
app.post("/searchprovider/:id", (req, res) => {
    // let sql ="select *from sign_up where  id=" + req.body.id; 
    const cite = req.params.id;
    console.log(cite);
    let sql = "";

    if (cite === 'pop') {
        sql = "select *from sign_up where category='Provider'"
    }
    else {
        sql = "select * from sign_up where category='Provider' and city='" + cite + "'";
    }
    // console.log(sql);
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

//route to login
app.post("/login", (req, res) => {
    let sql = "select * from sign_up where email='" + req.body.email + "' and password='" + req.body.password + "'";
    console.log(sql);
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

//route to  breakfast
app.get("/viewibreak/:id", function (req, res) {
    const id = req.params.id;
    console.log(id);

    // let sql = "select * from product";
    if (id !== "pop") {
        let sql = "SELECT * FROM tiffin_details where  userid='" + id + "' and item_category='Break fast'";
        console.log(sql);
        conn.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results);
        });
    }
});

//route to  lunch
app.get("/viewlunch/:id", function (req, res) {
    const id = req.params.id;
    console.log(id);
    // let sql = "select * from product";
    if (id !== "pop") {
        let sql = "SELECT * FROM tiffin_details where userid='" + id + "' and item_category='Dinner'";
        console.log(sql);
        conn.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results);
        });
    }
});

//route for category products
app.get('/category/:id', function (req, res) {
    const id = req.params.id;
    console.log(id);
    let sql = "";
    if (id === "allproducts")
        sql = "SELECT *FROM tiffin_details";
    else
        sql = "SELECT * FROM tiffin_details where item_category='" + id + "'";
    console.log(sql)

    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

//route to  breakfast
app.get("/showbreakfast", function (req, res) {

    let sql = "SELECT * FROM tiffin_details where userid='" + id + "' and item_category='Break fast'";
    console.log(sql);
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


//route to  lunch
app.get("/showlunch", function (req, res) {

    let sql = "SELECT * FROM tiffin_details where userid='" + id + "' and item_category='Lunch'";
    console.log(sql);
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

//route to  dinner
app.get("/showdinner", function (req, res) {

    let sql = "SELECT * FROM tiffin_details where userid='" + id + "' and item_category='Dinner'";
    console.log(sql);
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});

//route to  View Lunch for Admin Panel
app.get("/viewdinner/:id", function (req, res) {
    const id = req.params.id;
    console.log(id);
    if (id !== "pop") {
        let sql = "SELECT * FROM tiffin_details where userid='" + id + "' and item_category='Dinner'";
        console.log(sql);
        conn.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results);
        });
    }

});

//route to  show all items
app.get("/showitems", function (req, res) {

    let sql = "SELECT * FROM tiffin_details";
    console.log(sql);
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

//route for countcart
app.get('/viewcount', (req, res) => {
    let sql = "SELECT count(*) count from cart";
    conn.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.json(results);

    });

});

//Add Cart
app.get('/addcart/:id', async function (req, res) {
    const id = req.params.id;
    const price = req.params.price;
    console.log(id);
    var flag = 1;
    let sql1 = "select * from cart where id in(" + id + ")";
    let promise = new Promise((resolve, reject) => {
        conn.query(sql1, async (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
    let result = await promise;
    if (result.length <= 0) {
        console.log("ddddddd " + flag);
        let sql = "insert into cart values('haridas'," + id + ",1)";
        let query = conn.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results);


        });
    }
    else
        res.json();
});


//route for increment
app.get('/incqty/:id', function (req, res) {
    const id = req.params.id;
    console.log(id);
    let sql = "update cart set qty=qty+1 WHERE qty<3 AND id=" + id;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/viewcart');
    });
});

//route for decrement
app.get('/decQty/:id', function (req, res) {
    const id = req.params.id;
    let flag = false;
    let sq = "select qty from cart where id=" + id;
    conn.query(sq, async (err, results) => {
        console.log(results[0].qty);
        if (results[0].qty == 1) {
            let sql1 = "delete  FROM cart where id=" + id;
            console.log(sql1);
            conn.query(sql1, async (err, results) => {
                if (err) throw (err);
                flag = true;


            });
        }
    });

    if (flag == false) {
        let sql = "update cart set qty=qty-1 WHERE qty>0 AND id=" + id;
        conn.query(sql, (err, results) => {
            if (err) throw err;

        });
    }
    res.redirect('/viewcart');
});




//route for delete item from cart
app.get('/delcart/:id', function (req, res) {
    const id = req.params.id;
    console.log(id);
    let sql = "DELETE FROM cart WHERE id='" + id + "'"
    conn.query(sql, (err, results) => {
        if (err) throw err;

        let sql1 = "delete  FROM cart where id='" + id + "'";
        let prom = new Promise((resolve, reject) => {
            conn.query(sql1, async (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });


        // res.redirect('/viewcart1');
        res.redirect('/viewcart');

    });
});

//route for viewcart
app.get('/viewcart', (req, res) => {
    let sql = "SELECT tiffin_details.id,tiffin_details.item_name,tiffin_details.item_details,tiffin_details.item_price,tiffin_details.item_image,tiffin_details.item_category,cart.qty FROM tiffin_details,cart where tiffin_details.id=cart.id";
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});


//route for show data
app.post("/deleteprovider/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    let sql = "delete  FROM sign_up where email='" + id + "'";
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect("/provider");
    });
});


//addresses show
app.get('/address', (req, res) => {

    let sql = "SELECT *FROM billdetails WHERE billdetails.name='name'";
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);

    });

});

//route for billing
app.post('/bill', (req, res) => {
    console.log("generating bill")
    let cname1 = req.body.cname;
    console.log(cname1);
    let sql = "select bill.billno,bill.customer,bill.amount,tiffin_details.id,tiffin_details.item_name,purchase_qty,bill_items.purchase_price from bill,bill_items,tiffin_details where bill.billno = bill_items.billno and bill_items.product_id=tiffin_details.id";

    // let sql = "select bill.billno,customer_name,amount,product.product_id,product_name,purchase_qty,bill_items.product_price from bill,bill_items,product where bill.billno = bill_items.billno and bill_items.product_id=product.product_id and customer_name='raman'";
    let query1 = conn.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results)
        res.json(results);

    });
});



//new route for payment

app.post('/payment', async (req, res) => {


    //console.log(req.body.products);
    let data1 = { customer: req.body.cname, amount: req.body.amount };

    let sql = "INSERT INTO bill SET ?";
    // await db.query(queryString).catch(err => {throw err}); 
    let promise = new Promise((resolve, reject) => {

        conn.query(sql, data1, async (err, resultSet) => {
            if (err) reject(err);
            resolve(resultSet);
        });

    });

    let result = await promise;
    console.log(result);
    console.log("hello");

    console.log("done promise");
    let data = { customer: req.body.cname, cardno: req.body.cardno, amount: req.body.amount };
    console.log(data);
    sql = "INSERT INTO payment SET ?";
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
    });

    var billno = 10;
    let s = "select max(billno) 'billno' FROM bill ";
    let promise1 = new Promise((resolve, reject) => {


        conn.query(s, async (err, results) => {
            if (err) throw err;
            resolve(results);

            //console.log("billno="+billno)
        });
    });
    let myresult = await promise1;
    billno = myresult[0].billno;

    let sql1 = "delete from bill_items";
    let prom = new Promise((resolve, reject) => {
        conn.query(sql1, async (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });

    let o = req.body.products;

    for (let x in o) {

        console.log(o[x]);
        let sql = "INSERT INTO bill_items values(" + billno + "," + o[x].id + "," + o[x].qty + "," + o[x].item_price + ")";
        console.log(sql);
        conn.query(sql, data, (err, results) => {
            if (err) throw err;

        });
    }

});

app.get("/profile", validateToken, (req, res) => {
    res.json("profile");
});

db.sequelize.sync().then(() => {
    app.listen(4700, () => {
        console.log("EXPRESS SERVER RUNNING ON PORT 4700");
    });
});

// app.listen(4700, () => {
//   console.log(`express server running on 4700`);
// });
