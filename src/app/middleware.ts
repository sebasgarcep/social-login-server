import cookieParser from 'cookie-parser';
import express, { Express } from "express";
import logger from 'morgan';
import path from 'path';

export default function(app: Express) {
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
}