import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'
import admin from 'firebase-admin';
import { v2 as cloudinary } from 'cloudinary'
import fileUpload from 'express-fileupload'
import { ErrorThrow } from './utils/error.js'
import BlogRouter from './routes/blogRoutes.js'
import userRouter from './routes/userRoutes.js'
import notificationRouter from './routes/notification.js'
import path from 'path';
import { fileURLToPath } from 'url';

const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  };
  
const server = express();
server.use(express.json())
server.use(fileUpload({
    useTempFiles: true
}))
let PORT = 3000;

server.use(cors())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(express.static(path.resolve(__dirname, 'dist')));



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.DB_CONNECTION, {
    autoIndex: true
}).then(() => {
    console.log("Database connected Successfully")
}).catch((err) => {
    console.error(err)
})

server.get('/', (req, res) => {
    res.send("Hello from the server side")
})

server.post('/upload-image', async (req, res) => {
    try {
        const { image } = req.files;
        await cloudinary.uploader.upload(image.tempFilePath, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err })
            } else {
                return res.status(202).json({ "url": result.url })
            }
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: err.message })
    }
})

server.use(userRouter)
server.use(BlogRouter)
server.use(notificationRouter)

server.use(ErrorThrow)

server.listen(PORT, () => {
    console.log("Listening on port ->" + PORT)
})
