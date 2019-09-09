var express = require("express");
var router = express.Router();
var pool = require("../config/dbconfig");


/* 주문조회 */
router.get("/", function(req, res, next) {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    }
    var sql = "SELECT * FROM bookorder;";
    conn.query(sql, (err, row) => {
      conn.release();
      if (err) {
        throw err;
      }
      res.send(row);
    });
  });
});
/* 사용자별 주문조회 */
router.get("/:id", function(req, res, next) {
  const { id } = req.params;
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    }
    var sql = "SELECT * FROM bookorder WHERE Member_memberID = ?;";
    conn.query(sql, [id] ,(err, row) => {
      conn.release();
      if (err) {
        throw err;
      }
      res.send(row);
    });
  });
});

//주문상세조회
router.get("/detail/:id", function(req, res, next) {
  const { id } = req.params;
  var resData = [];
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    }
    var sql = "SELECT * FROM bookstore.orderdetail,bookstore.book WHERE orderdetail.bookID = book.bookID AND orderID = ?;"
    conn.query(sql,[id],(err,result) => {
      conn.release();
      if(err){
        throw err;
      }
      res.send(result);
    })  

  });
});

//등록
router.post("/", (req, res) => {
  const {
    orderID,
    orderQTY,
    orderAmount,
    Member_memberID,
    orderItem
  } = req.body;
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    }
    var sql = `INSERT INTO bookorder(orderID, orderQTY, orderAmount, Member_memberID) VALUES (?,?,?,?);`;
    conn.query(
      sql,
      [orderID, orderQTY, orderAmount, Member_memberID],
      (err, row) => {
        if (err) {
          throw err;
        }
        if (row) {
          var sql = `
          INSERT INTO
            orderdetail
              (
                orderID,
                bookID,
                price,
                QTY
              )
              VALUES
              (
                (SELECT MAX(orderID) FROM bookorder WHERE Member_memberID = ? ORDER BY orderID DESC),
                ?,
                ?,
                ?
              );`;
          try {
            orderItem.forEach(element => {
              const { bookID, price, QTY } = element;
              conn.query(
                sql,
                [Member_memberID, bookID, price, QTY],
                (err, result) => {}
              );
            });
          } catch (e) {
            console.log(e);
            res.send({ result: false, msg: e });
          } finally {
            conn.release();
          }

          res.send({
            result: true
          });
        } else {
          res.send(500, {
            result: false
          });
        }
      }
    );
  });
});

//수정
router.put("/", (req, res) => {
  const { orderID, orderQTY, orderAmount, Member_memberID } = req.body;
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    }
    var sql =
      "UPDATE bookorder SET orderQTY, orderAmount, Member_memberID WHERE orderID = ?";
    conn.query(
      sql,
      [orderQTY, orderAmount, Member_memberID, orderID],
      (err, row) => {
        conn.release();
        if (err) {
          throw err;
        }
        if (row) {
          res.send({
            result: true
          });
        } else {
          res.send(500, {
            result: false
          });
        }
      }
    );
  });
});

//삭제
router.delete("/", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    }
    var sql = "DELETE FROM bookorder WHERE orderID= ?;";
    conn.query(sql, [id], (err, row) => {
      conn.release();
      if (err) {
        throw err;
      }
      if (row) {
        res.send({
          result: true
        });
      } else {
        res.send(500, {
          result: false
        });
      }
    });
  });
});

module.exports = router;
