import { Router as ExpressRouter } from 'express';
import { generatePDF, generateScreenshot } from './controllers';

export const Router = ExpressRouter();

Router.post('/pdf', generatePDF);
Router.post('/screenshot', generateScreenshot);