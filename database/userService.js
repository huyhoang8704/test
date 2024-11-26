const client = require('./database');
const { v4: uuidv4 } = require('uuid')
class UserService {
    constructor() { };
    async findByEmail(email) {
        return new Promise((resolve, reject) => {
            client.query(`
                SELECT * FROM account
                WHERE email = ?
            `, [email], (err, res) => {
                if (err) {
                    reject({
                        status: 400,
                        msg: err.message,
                        data: null
                    });
                }
                else if (res.length === 0) {
                    resolve({
                        status: 404,
                        msg: 'The email is not exist',
                        data: null
                    });
                }
                else {
                    resolve({
                        status: 200,
                        msg: 'Fetch success',
                        data: res
                    });
                }
            })
        })
    }
    async getHistoryPrinting(sid) {
        const id = sid.sid
        console.log(id)   // ID student
        return new Promise((resolve, reject) => {
            client.query(`
                SELECT 
                    T.Tstart_time, 
                    T.Tend_time, 
                    T.Tcopies, 
                    T.Tpages_per_copy, 
                    T.Tstatus, 
                    D.Dname, 
                    P.Pname
                FROM TRANSACTION T
                JOIN DOCUMENT D ON T.DID = D.DID
                JOIN PRINTER P ON T.PID = P.PID
                WHERE T.SID = ?
            `, [id], (err, res) => {
                if (err) {
                    console.error("Error during query:", err); // Log lỗi chi tiết
                    reject({
                        status: 400,
                        msg: err.message,
                        data: null
                    });
                } else if (res.length === 0) {
                    resolve({
                        status: 404,
                        msg: 'No printing history found for the student',
                        data: null
                    });
                } else {
                    resolve({
                        status: 200,
                        msg: 'Fetch success',
                        data: res
                    });
                }
            });
        });
    }
    
    
}



module.exports = new UserService;