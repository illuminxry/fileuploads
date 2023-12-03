const mysql = require('mysql2/promise');
const multer = require('multer');
const conn = {
        host: 'localhost',
        database: 'uploadfile',
        user: 'root',
        password: ''
};

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads'); // Set your upload directory here
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });
    const upload = multer({ storage: storage });
exports.getIndexPage = async (req, res) => { // Added async keyword here
        try {
                const pool = mysql.createPool(conn);
                const connection = await pool.getConnection();
                const [rows] = await connection.query('SELECT * FROM uploaded_files');
                connection.release();

                res.render('index', { files: rows }); // Pass the 'rows' data to the 'files.ejs' template
        } catch (err) {
                console.error('Error fetching files:', err);
                res.status(500).json({ error: 'Error fetching files' });
        }
};
exports.upload = async (req, res) => {
        try {
                // Get file information from req.file
                const { filename, path, mimetype, size } = req.file;
        
                // Insert file details into the database
                const connection = await pool.getConnection();
                const [result] = await connection.query(
                    'INSERT INTO uploaded_files (filename, path, mimetype, size) VALUES (?, ?, ?, ?)',
                    [filename, path, mimetype, size]
                );
                connection.release();
        
                res.redirect('/');
            } catch (err) {
                console.error('Error uploading file:', err);
                res.status(500).json({ error: 'Error uploading file' });
            }
}
exports.download= async (req, res) => {
        try {
                const fileName = req.params.filename;
                // Retrieve the file path from the database based on the provided filename
                const connection = await pool.getConnection();
                const [rows] = await connection.query('SELECT path FROM uploaded_files WHERE filename = ?', [fileName]);
                connection.release();
        
                if (rows.length > 0) {
                    const filePath = rows[0].path;
                    // Trigger the download of the specified file
                    res.download(filePath);
                } else {
                    res.status(404).send('File not found');
                }
            } catch (err) {
                console.error('Error downloading file:', err);
                res.status(500).send('Error downloading file');
            }
}