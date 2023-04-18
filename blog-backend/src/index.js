import dotenv from 'dotenv';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';

import api from './api/index.js';
import jwtMiddleware from './lib/jwtMiddleware.js';
import createFakeData from './createFakeData.js';

dotenv.config();

const { PORT, MONGO_URI } = process.env;

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        // createFakeData();
    })
    .catch((e) => {
        console.log(e);
    });

const app = new Koa();
const __dirname = path.resolve();
const router = new Router();

router.use('/api', api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);

app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(__dirname, '../blog-frontend/build');
app.use(serve(buildDirectory));
app.use(async (ctx) => {
    // Not Found이고, 주소가 /api로 시작하지 않는 경우
    if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
        // index.html 내용을 반환
        await send(ctx, 'index.html', { root: buildDirectory });
    }
});

const port = PORT || 4000;
app.listen(port, () => {
    console.log('Listening to port %d', port);
});
