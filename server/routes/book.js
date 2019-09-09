var express = require('express');
var router = express.Router();
var pool = require("../config/dbconfig");

/**
 *검색하기
 *@returns(Array)
 */
router.get('/', function(req, res, next) {
    pool.getConnection((err,conn) => {
        if(err){
            throw err;
        }
        var sql = "SELECT * FROM book;";
        conn.query(sql, (err, row) => {
            conn.release();
            if(err){
                throw err;
            }
            res.send(row);
        })
    })
});

/**
 * 책 등록하기
 * @param(bookName ,bookPrice, bookAuthor )
 * @return (boolean)
 */
router.post("/",(req,res) => {
    const { bookName ,bookPrice, bookAuthor } = req.body;
    pool.getConnection((err,conn) => {
        if(err){
            throw err;
        }
        var sql = `INSERT INTO book( bookName , bookPrice , bookAuthor ) VALUES (?,?,?);`;
        conn.query(sql,[ bookName, bookPrice, bookAuthor ],(err,row) => {
            conn.release();
            if(err){
                throw err;
            }
            if(row){
                res.send({
                    result : true
                });
            }else{
                res.send({
                    result: false
                });
            }
        });
    });
});

/**
 * 책 수정하기
 */
router.put("/", (req, res) => {
    const { bookID,bookName, bookPrice, bookAuthor } = req.body;
    pool.getConnection((err, conn) => {
      if(err){
        throw err;
      }
      var sql = 'UPDATE Book SET bookName = ?,bookPrice = ?,bookAuthor = ? WHERE bookID = ?' ;
      conn.query(sql,[bookName, bookPrice, bookAuthor ,bookID ],(err, row) => {
        conn.release();
        if(err){
          throw err;
        }
        if(row){
          res.send({
            result:true
          });
        }else{
          res.send(500, {
            result:false
          });
        }
      });
    });
  });
  
  //책 삭제하기
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    pool.getConnection((err, conn) => {
      if(err){
        throw err;
      }
      var sql = 'DELETE FROM Book WHERE bookID= ?;';
      conn.query(sql,[id ],(err, row) => {
        conn.release();
        if(err){
          throw err;
        }
        if(row){
          res.send({
            result:true
          });
        }else{
          res.send(500, {
            result:false
          });
        }
      });
    });
  });
  
module.exports = router;
