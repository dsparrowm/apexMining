import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import protect from './helpers/protect';
//import authenticationRoute from './routes/authentication';
//import routes from './routes/index';
import healthCheck from './handlers/healthcheck';
import helmet from 'helmet';


const app = express();

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//  Routers
//app.use("/api/auth", authenticationRoute)
//app.use("/api", protect, routes)

app.get('/status', healthCheck)


export default app;