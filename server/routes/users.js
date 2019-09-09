var express = require("express");
var router = express.Router();
var pool = require("../config/dbconfig");

/* GET users listing. */
router.get("/", function(req, res, next) {
  pool.getConnection((err,conn) =>{
    if(err){
      throw err;
    }
    var sql = "SELECT * FROM member;"
    conn.query(sql,(err,row) => {
      conn.release();
      if(err){
        throw err;
      }
      res.send(row);
    });
  });
});

router.post("/join", (req, res) => {
  //res.send(req.body);
  pool.getConnection((error, conn) => {
    if (error) {
      throw error;
    }
    var qury = "SELECT * FROM member WHERE memberID = ?";
    conn.query(qury, [req.body.memberID], (error, raw) => {
      if (error) {
        throw error;
      }
      //res.send(result);
      if (raw.length === 0) {
        var { memberID, memberPassword, membername } = req.body;
        var qury =
          "INSERT INTO member(memberID,memberPasword,membername) VALUES(?,?,?)";
        conn.query(
          qury,
          [memberID, memberPassword, membername],
          (err, result) => {
            conn.release();
            if (err) {
              throw err;
            }
            if(result){
              res.send(200, {result: true});
            }else{

              res.send(400, {result: false});
            }
          }
        );
      } else {
        conn.release();
        res.send({
          result: false
        });
      }
    });
  });
});

router.post("/login", (req, res) => {
  //res.send(req.body);
  pool.getConnection((error, conn) => {
    if (error) {
      throw error;
    }
    var { memberID, memberPassword } = req.body;    
    var qury = "SELECT * FROM member WHERE memberID=? AND memberPasword= ?";
    conn.query(qury, [memberID, memberPassword], (error, raw) => {
      conn.release(); //db연결을 끊는다.
      if (error) {
        throw error;
      }
      if(raw.length !== 0){
        var data = {
          memberID: raw[0].memberID,
          memberName: raw[0].membername
        };
        res.send(data); //raw[0][0]형태는 사용불가
      }else{
        res.send(400, {result: false})
      }
      
    });
  });
});

module.exports = router;
